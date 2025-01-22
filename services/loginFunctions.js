const databaseAPI = require("../config/login database");
const bcrypt = require("bcrypt");

const { setCurrentUser, getCurrentUser } = require("./currentUser"); 


async function updateUserDetails(req, res) {
    let responseJSON = req.body;
    let entryId = req.params.id;
  
    let newJSON = {
      username: responseJSON["username"],
      email: responseJSON["email"],
      full_name: responseJSON["full_name"],
      date_of_birth: new Date(responseJSON["date_of_birth"])
    }
  
    try {
      let updateResponseData = await databaseAPI.update('logins', entryId, newJSON);
      let updateUsername = updateResponseData["username"];
      let updateUser = await databaseAPI.findUserByUsername(updateUsername);
      setCurrentUser(updateUser);
      const currentUser = getCurrentUser();
      res.render("profile", { currentUser });
    } catch (error) {
      console.log(error);
      res.render("edit profile", { errorMsg: "An error occurred when trying to update your details", currentUser });
    }
  }
  
  async function validateUserAndSignup(req, res) {
    let responseJSON = req.body;
    let { username, password, confirmPassword } = { username: responseJSON.username, password: responseJSON.password, confirmPassword: responseJSON['confirm-password'] };
    try {
        let signupDetailsValid = await validateSignup(username, password, confirmPassword); // completes checks to validate signup details
        if (typeof(signupDetailsValid) == 'string') {
            res.render('signup', { errorMsg: signupDetailsValid }); // if an error message is returned then render the signup page with the error message
        } else {
            let newUser = await createNewUser(username, password);
            setCurrentUser(newUser);
            res.redirect("/index"); // if the checks were successful then create the account, assign the current user to be the username and render the home page
        }
    } catch(error) {
        console.log(error);
        res.render('signup', { errorMsg: 'An error occured while trying to create this account' });
    }
  }
  
  async function validateUserAndLogin(req, res) {
    let responseJSON = req.body;
    let { username, password } = responseJSON;
    try {
        let loginDetailsValid = await validateLogin(username, password); // completes checks to validate login details
        if (typeof(loginDetailsValid) == 'string') {
            res.render('login', { errorMsg: loginDetailsValid }); // if an error message is returned then render the login page with the error message
        } else {
            setCurrentUser(loginDetailsValid);
            res.redirect("/index"); // if the checks were successful then assign the current user to be the username and render the home page
        }
    } catch(error) {
        console.log(error);
        res.render('login', { errorMsg: 'An error occurred while trying to log in' });
    }
  }
  
  async function createNewUser(username, password) { // adds new user details to the database
    let hashedPassword = await bcrypt.hash(password, 10);
    let details = {
        username: username,
        password: hashedPassword,
        email: "",
        full_name: ""
    }
    await databaseAPI.write('logins', details);
    return await databaseAPI.findUserByUsername(username);
  }
  
  // validation functions
  function validateLoginDetailsFormat(username, password, confirmPassword) { // checks inputs match the required format
    let usernameRegEx = /^[0-9A-Za-z]{4,20}$/;
    let passwordRegEx = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}$/;
    return username.toString().match(usernameRegEx) !== null && 
    password.toString().match(passwordRegEx) !== null && 
    password === confirmPassword;
  }
  
  function presenceCheckLogin(username, password) { // checks that no fields were left blank
    return username != "" && password != "";
  }
  
  async function userExists(username) { // checks if a user exists by checking if their username is already in the database
    let user = await databaseAPI.findUserByUsername(username);
    return user;
  }
  
  async function checkPasswordMatch(password, comparePassword) { // checks if the password entered matches the encrypted password stored on the database
    let passwordMatch = await bcrypt.compare(password, comparePassword);
    return passwordMatch;
  }
  
  async function validateLogin(username, password) { // will complete all login checks sequentially and return an error message if any of them fail
    if (!presenceCheckLogin(username, password)) {
        return 'Please fill in all fields';
    }
    let user = await userExists(username);
    if (!user) {
        return 'An account with this username does not exist';
    }
    if (!await checkPasswordMatch(password, user.password)) {
        return 'The password you entered was incorrect';
    }
    return user; // return user object if all validation passed
  }
  
  async function validateSignup(username, password, confirmPassword) { // will complete all signup checks sequentially and return an error message if any of them fail
    if (!validateLoginDetailsFormat(username, password, confirmPassword)) {
        return 'Details entered do not match requested format';
    }
    let user = await userExists(username);
    if (user) {
        return 'An account with this username already exists';
    }
    return true; // return true if all validation passed
  }
  
  module.exports = { validateUserAndSignup, validateUserAndLogin, updateUserDetails };