

const { Router } = require('express');
const { addPost, getPosts, deletePost } = require('../controllers/post');

const router = new Router();

// router.post("/get", postsGetter)

router.post("/add", addPost)

router.post("/", getPosts)

router.delete("/delete", deletePost)

module.exports = router