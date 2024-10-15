const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const DATA_FILE = 'posts.json';

// Helper function to read posts from the file
function readPosts() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write posts to the file
function writePosts(posts) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// Get all posts
app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// Add a new post
app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    const posts = readPosts();
    newPost.id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    posts.push(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
});

// Update an existing post
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const updatedPost = req.body;
    let posts = readPosts();

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedPost };
        writePosts(posts);
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});