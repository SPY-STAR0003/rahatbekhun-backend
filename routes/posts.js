

const { Router } = require('express');
const { addPost, getPosts, deletePost, uploadCover, duplicatedPostFinder } = require('../controllers/post');

const router = new Router();

// router.post("/get", postsGetter)

router.post("/add", addPost)

router.post("/", getPosts)

router.delete("/delete", deletePost)

router.post('/upload-cover', uploadCover)

module.exports = router