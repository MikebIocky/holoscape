// Import required modules
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Path to the JSON file that will store posts
const postsFilePath = 'posts.json';

// Load posts from file or initialize empty array if file doesn't exist
function loadPosts() {
  if (fs.existsSync(postsFilePath)) {
    const data = fs.readFileSync(postsFilePath);
    return JSON.parse(data);
  }
  return [];
}

// Save posts to the JSON file
function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

// Endpoint to get all posts
app.get('/api/posts', (req, res) => {
  const posts = loadPosts();
  res.json(posts);
});

// Endpoint to add a new post
app.post('/api/posts', (req, res) => {
  const posts = loadPosts();
  const newPost = {
    id: Date.now(),
    author: req.body.author || 'anonymous',
    content: req.body.content,
    date: new Date().toISOString(),
    replies: []
  };
  posts.push(newPost);
  savePosts(posts);
  res.status(201).json(newPost);
});

// Endpoint to add a reply to a post
app.post('/api/posts/:id/replies', (req, res) => {
  const posts = loadPosts();
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const newReply = {
    author: req.body.author || 'anonymous',
    content: req.body.content,
    date: new Date().toISOString()
  };
  post.replies.push(newReply);
  savePosts(posts);
  res.status(201).json(newReply);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});