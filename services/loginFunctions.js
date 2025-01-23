const databaseAPI = require("../config/loginDatabase");
const bcrypt = require("bcrypt");
const { setCurrentUser, getCurrentUser } = require("./currentUser");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fullNamePattern = /^[A-Za-z]+ [A-Za-z]+$/;

/**
 * Updates the user's profile details in the database.
 * @param {Object} req - The request object containing updated user details.
 * @param {Object} res - The response object to render the page or send a response.
 */
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

/**
 * Validates user signup details and creates a new account.
 * @param {Object} req - The request object containing signup data.
 * @param {Object} res - The response object to render the signup page or redirect.
 */
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

/**
 * Validates user login details and logs the user in.
 * @param {Object} req - The request object containing login data.
 * @param {Object} res - The response object to render the login page or redirect.
 */
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

/**
 * Extracts user details from the request body.
 * @param {Object} data - The request body containing user details.
 * @returns {Object} The extracted user details.
 */
function extractUserDetails(data) {
  return {
    username: data.username,
    email: data.email,
    fullName: data.full_name,
    dateOfBirth: new Date(data.date_of_birth),
  };
}

/**
 * Validates the email format.
 * @param {string} email - The email to validate.
 * @returns {string|null} Returns an error message if invalid, otherwise null.
 */
function validateEmail(email) {
  return emailPattern.test(email)
    ? null
    : "Please enter a valid email address. It must include '@' and a valid domain.";
}

/**
 * Validates the full name format.
 * @param {string} fullName - The full name to validate.
 * @returns {string|null} Returns an error message if invalid, otherwise null.
 */
function validateFullName(fullName) {
  return fullNamePattern.test(fullName)
    ? null
    : "Please enter a valid full name with a space between forename and surname.";
}

/**
 * Updates the user details in the database.
 * @param {string} userId - The ID of the user to update.
 * @param {Object} userDetails - The updated user details.
 * @returns {Object} The updated user object.
 */
async function updateUserInDatabase(userId, userDetails) {
  const updateResponse = await databaseAPI.update(
    "logins",
    userId,
    userDetails
  );
  return await databaseAPI.findUserByUsername(updateResponse.username);
}

/**
 * Creates a new user in the database with a hashed password.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Object} The newly created user object.
 */
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

/**
 * Validates the format of the login details.
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {string} confirmPassword - The confirm password entered by the user.
 * @returns {boolean} Returns true if valid, otherwise false.
 */
function validateLoginDetailsFormat(username, password, confirmPassword) {
  const usernameRegEx = /^[0-9A-Za-z]{4,20}$/;
  const passwordRegEx = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}$/;
  return (
    usernameRegEx.test(username) &&
    passwordRegEx.test(password) &&
    password === confirmPassword
  );
}

/**
 * Validates that both username and password fields have been populated.
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @returns {boolean} Returns true if both fields populated, otherwise false.
 */
function presenceCheckLogin(username, password) { // checks that no fields were left blank
  return username != "" && password != "";
}

/**
 * Checks if the username already exists in the database.
 * @param {string} username - The username to check for existence.
 * @returns {Object|null} The user object if found, null if not found.
 */
async function userExists(username) {
  return await databaseAPI.findUserByUsername(username);
}

/**
 * Compares the entered password with the stored encrypted password.
 * @param {string} password - The entered password.
 * @param {string} comparePassword - The stored password to compare with.
 * @returns {boolean} True if the passwords match, false otherwise.
 */
async function checkPasswordMatch(password, comparePassword) {
  return await bcrypt.compare(password, comparePassword);
}

/**
 * Validates the login credentials provided by the user.
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @returns {Object|string} Returns the user object if valid or an error message if invalid.
 */
async function validateLoginDetails(username, password) {
  if (!presenceCheckLogin(username, password)) {
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

/**
 * Validates the signup details provided by the user.
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {string} confirmPassword - The confirm password entered by the user.
 * @returns {boolean|string} Returns true if valid, or an error message if invalid.
 */
async function validateSignupDetails(username, password, confirmPassword) {
  if (!validateLoginDetailsFormat(username, password, confirmPassword)) {
    return "Details entered do not match requested format";
  }
  if (await userExists(username)) {
    return "An account with this username already exists";
  }
  return true;
}

/**
 * Renders an error message on the specified view.
 * @param {Object} res - The response object.
 * @param {string} page - The view to render.
 * @param {string} errorMsg - The error message to display.
 */
function renderError(res, page, errorMsg) {
  const currentUser = getCurrentUser();
  res.render(page, { errorMsg, currentUser });
}

module.exports = {
  validateUserAndSignup,
  validateUserAndLogin,
  updateUserDetails,
  validateLoginDetailsFormat,
  presenceCheckLogin
};
