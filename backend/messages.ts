import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

const createPost = async (req: Request, res: Response) => {
    const { user_id, title, content, parent_id, datetime } = req.body

    try {
        if (parent_id) {
            /*
            const parent = await prisma.post.findUnique({ where: { parent_id } })

            if (parent) {
                // Add to thread
                const post = await prisma.post.create({
                    data: {
                        user_id,
                        title,
                        content,
                        sub_posts: [],
                        likes: 0,
                        parent_id,
                        datetime
                    }
                })

                res
                .status(201)
                .json({ message: "Successfully created post.", post: post });
            }  
            */
        } else {
            /*
            const post = await prisma.post.create({
                data: {
                    user_id,
                    title,
                    content,
                    sub_posts: [],
                    likes: 0,
                    parent_id: null,
                    datetime
                }
            })

            res
            .status(201)
            .json({ message: "Successfully created post.", post: post });
            */
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post.");
    }
}

const getPosts = async (req: Request, res: Response) => {

}

const getMessages = async (req: Request, res: Response) => {

}

export { createPost, getPosts, getMessages }
