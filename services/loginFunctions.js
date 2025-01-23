const databaseAPI = require("../config/loginDatabase");
const bcrypt = require("bcrypt");
const { setCurrentUser, getCurrentUser } = require("./currentUser");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fullNamePattern = /^[A-Za-z]+ [A-Za-z]+$/;

async function updateUserDetails(req, res) {
  const updatedUserDetails = extractUserDetails(req.body);
  const userId = req.params.id;

  const emailError = validateEmail(updatedUserDetails.email);
  if (emailError) return renderError(res, "edit profile", emailError);

  const fullNameError = validateFullName(updatedUserDetails.fullName);
  if (fullNameError) return renderError(res, "edit profile", fullNameError);

  try {
    const updatedUser = await updateUserInDatabase(userId, updatedUserDetails);
    setCurrentUser(updatedUser);
    res.render("profile", { currentUser: getCurrentUser() });
  } catch (error) {
    console.error(error);
    renderError(
      res,
      "edit profile",
      "An error occurred when trying to update your details"
    );
  }
}

async function validateUserAndSignup(req, res) {
  const { username, password, confirmPassword } = req.body;

  try {
    const validationResult = await validateSignupDetails(
      username,
      password,
      confirmPassword
    );
    if (typeof validationResult === "string") {
      return renderError(res, "signup", validationResult);
    }
    const newUser = await createNewUser(username, password);
    setCurrentUser(newUser);
    res.redirect("/index");
  } catch (error) {
    console.error(error);
    renderError(
      res,
      "signup",
      "An error occurred while trying to create this account"
    );
  }
}

async function validateUserAndLogin(req, res) {
  const { username, password } = req.body;

  try {
    const validationResult = await validateLoginDetails(username, password);
    if (typeof validationResult === "string") {
      return renderError(res, "login", validationResult);
    }
    setCurrentUser(validationResult);
    res.redirect("/index");
  } catch (error) {
    console.error(error);
    renderError(res, "login", "An error occurred while trying to log in");
  }
}

function extractUserDetails(data) {
  return {
    username: data.username,
    email: data.email,
    fullName: data.full_name,
    dateOfBirth: new Date(data.date_of_birth),
  };
}

function validateEmail(email) {
  return emailPattern.test(email)
    ? null
    : "Please enter a valid email address. It must include '@' and a valid domain.";
}

function validateFullName(fullName) {
  return fullNamePattern.test(fullName)
    ? null
    : "Please enter a valid full name with a space between forename and surname.";
}

async function updateUserInDatabase(userId, userDetails) {
  const updateResponse = await databaseAPI.update(
    "logins",
    userId,
    userDetails
  );
  return await databaseAPI.findUserByUsername(updateResponse.username);
}

async function createNewUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetails = {
    username,
    password: hashedPassword,
    email: "",
    fullName: "",
  };
  await databaseAPI.write("logins", userDetails);
  return await databaseAPI.findUserByUsername(username);
}

function validateLoginDetailsFormat(username, password, confirmPassword) {
  const usernameRegEx = /^[0-9A-Za-z]{4,20}$/;
  const passwordRegEx = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}$/;
  return (
    usernameRegEx.test(username) &&
    passwordRegEx.test(password) &&
    password === confirmPassword
  );
}

async function userExists(username) {
  return await databaseAPI.findUserByUsername(username);
}

async function checkPasswordMatch(password, comparePassword) {
  return await bcrypt.compare(password, comparePassword);
}

async function validateLoginDetails(username, password) {
  if (!username || !password) {
    return "Please fill in all fields";
  }
  const user = await userExists(username);
  if (!user) {
    return "An account with this username does not exist";
  }
  if (!(await checkPasswordMatch(password, user.password))) {
    return "The password you entered was incorrect";
  }
  return user;
}

async function validateSignupDetails(username, password, confirmPassword) {
  if (!validateLoginDetailsFormat(username, password, confirmPassword)) {
    return "Details entered do not match requested format";
  }
  if (await userExists(username)) {
    return "An account with this username already exists";
  }
  return true;
}

function renderError(res, page, errorMsg) {
  const currentUser = getCurrentUser();
  res.render(page, { errorMsg, currentUser });
}

module.exports = {
  validateUserAndSignup,
  validateUserAndLogin,
  updateUserDetails,
};
