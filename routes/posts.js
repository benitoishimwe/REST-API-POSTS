const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Create a post
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'title and description are required' });
  }

  try {
    const post = new Post({ title, description });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch {
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Get a specific post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.postId });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

// Update a post title
router.patch('/:postId', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  try {
    const result = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title } }
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: 'Failed to update post' });
  }
});

module.exports = router;
