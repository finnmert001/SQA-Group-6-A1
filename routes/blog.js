const express = require("express");
const router = express.Router();
const { BlogPost } = require("../models");
const { Sequelize, Op } = require("sequelize");
const { validateUserAndSignup, validateUserAndLogin, updateUserDetails } = require("../services/loginFunctions");

const { setCurrentUser, getCurrentUser } = require("../services/currentUser"); 

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
  res.redirect("/index");
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
    res.redirect("/index");
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
  const currentUser = getCurrentUser();
  res.render("profile", { title: "My Profile", currentUser });
});

router.get("/edit-profile", (req, res) => {
  const currentUser = getCurrentUser();
  res.render("edit profile", { title: "Edit Profile", currentUser });
});

router.post("/edit-profile/:id", updateUserDetails);

module.exports = router;