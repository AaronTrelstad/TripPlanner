import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

/**
 * Follow a new user
 * @param req 
 * @param res 
 */
const followUser = (req: Request, res: Response) => {
    const [userId, followId] = req.body

    
}

/**
 * Get all of the follower for the current user
 * @param req 
 * @param res 
 */
const getFollowers = (req: Request, res: Response) => {
    
}

/**
 * Get all of the users that the current user follows
 * @param req 
 * @param res 
 */
const getFollowing = (req: Request, res: Response) => {

}

export { followUser, getFollowers, getFollowing }

