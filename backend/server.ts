import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authenticateUser } from './middleware'
import { createUser, login } from './authQueries'
import { getUserInfo, updateProfile } from './userData'
import { followUser, getFollowers, getFollowing } from './socialQueries'
import { getTopLocations } from './locationData'
import { createPost, getPosts, getMessages } from './messages'

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Allows user to login to account
 */
app.post('/api/login', (req, res) => {
    login(req, res);
});

/**
 * Allows new users to create an account
 */
app.post('/api/register', (req, res) => {
    createUser(req, res)
})

/**
 * Returns user data
 */
app.get(`/api/self/:id`, authenticateUser, (req, res) => {
    getUserInfo(req, res);
})

app.patch('/api/updateprofile', authenticateUser, (req, res) => {
    updateProfile(req, res)
})

/**
 * Password reset
 */
app.put('/api/resetpassword', (req, res) => {
    
})

/**
 * Allows user to follow another user
 */
app.post('/api/follow', authenticateUser, (req, res) => {
    followUser(req, res)
})

/**
 * Get the followers of a user
 */
app.get('/api/getfollowers', authenticateUser, (req, res) => {
    getFollowers(req, res)
})

/**
 * Get the people that a user follows
 */
app.get('/api/getfollowing', authenticateUser, (req, res) => {
    getFollowing(req, res)
})

/**
 * Publishes a discussion post
 */
app.post('/api/publishdiscussion', authenticateUser, (req, res) => {
    createPost(req, res)
})

/**
 * Publishes a comment post
 */
app.post('/api/publishcomment', authenticateUser, (req, res) => {

})

/**
 * Gets the top locations
 */
app.get('/api/gettoplocations', (req, res) => {
    getTopLocations(req, res)
}) 

/**
 * Gets discussion posts
 */
app.get('/api/getdiscussions', (req, res) => {
    getPosts(req, res)
})

/**
 * Gets messages 
 */
app.get('/api/getmessages', authenticateUser, (req, res) => {
    getMessages(req, res)
})

/**
 * Start server at port 3000
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


