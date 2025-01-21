const express = require("express");
const router = express.Router();
const { BlogPost } = require("../models");
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const databaseAPI = require("../config/login datatabse");

let currentUser = require("../app");

router.get("/", (req, res) => {
  res.render("login");
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/signup', validateUserAndSignup);
router.post('/login', validateUserAndLogin);

router.get("/index", async (req, res) => {
  const posts = await BlogPost.findAll();
  res.render("index", { title: "Blog Posts", posts });
});

router.get("/search", async (req, res) => {
  const query = req.query.query || "";
  const topic = req.query.topic || "";
  const author = req.query.author || "";

  let posts;
  if (query.trim() === "" && topic === "" && author === "") {
    posts = await BlogPost.findAll();
  } else {
    posts = await BlogPost.findAll({
      where: {
        [Sequelize.Op.and]: [
          {
            [Sequelize.Op.or]: [
              { title: { [Op.like]: `%${query}%` } },
              { topic: { [Op.like]: `%${query}%` } },
              { author: { [Op.like]: `%${query}%` } },
            ],
          },
          ...(topic ? [{ topic: topic }] : []),
        ],
      },
    });
  }

  res.render("index", {
    title: "Search Results",
    posts,
    query,
    topic,
    author,
  });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create Post" });
});

router.post("/create", async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
});

router.get("/post/:id", async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    res.render("post", { title: post.title, post });
  } else {
    res.status(404).send("Post not found");
  }
});

router.get("/edit/:id", async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    res.render("edit", { title: "Edit Post", post });
  } else {
    res.status(404).send("Post not found");
  }
});

router.post("/edit/:id", async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    await post.update(req.body);
    res.redirect(`/post/${post.id}`);
  } else {
    res.status(404).send("Post not found");
  }
});

router.post("/delete/:id", async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    await post.destroy();
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

router.get("/stats", async (req, res) => {
  const posts = await BlogPost.findAll();
  const lengths = posts.map((post) => post.title.length + post.content.length);
  const stats = {
    average_length: lengths.reduce((a, b) => a + b, 0) / lengths.length,
    median_length: lengths.sort((a, b) => a - b)[
      Math.floor(lengths.length / 2)
    ],
    max_length: Math.max(...lengths),
    min_length: Math.min(...lengths),
    total_length: lengths.reduce((a, b) => a + b, 0),
  };
  res.render("stats", { title: "Post Statistics", ...stats });
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "My Profile", currentUser });
});

router.get("/edit-profile", (req, res) => {
  res.render("edit profile", { title: "Edit Profile", currentUser });
});

// Login functions - JC

async function validateUserAndSignup(req, res) {
  let responseJSON = req.body;
  let { username, password, confirmPassword } = { username: responseJSON.username, password: responseJSON.password, confirmPassword: responseJSON['confirm-password'] };
  try {
      let signupDetailsValid = await validateSignup(username, password, confirmPassword); // completes checks to validate signup details
      if (typeof(signupDetailsValid) == 'string') {
          res.render('signup', { errorMsg: signupDetailsValid }); // if an error message is returned then render the signup page with the error message
      } else {
          let newUser = await createNewUser(username, password);
          currentUser = newUser;
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
          currentUser = loginDetailsValid;
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
      password: hashedPassword
  }
  await databaseAPI.write('logins', details);
  return await databaseAPI.findUserByUsername(username);
}

// validation functions
function validateLoginDetailsFormat(username, password, confirmPassword) { // checks inputs match the required format
  let usernameRegEx = /^[0-9A-Za-z]{4,20}$/;
  let passwordRegEx = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}$/;
  return username.toString().match(usernameRegEx) && password.toString().match(passwordRegEx) && password == confirmPassword;
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

module.exports = router;
