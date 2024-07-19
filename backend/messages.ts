import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

const getDiscussions = async (req: Request, res: Response) => {

}

const getMessages = async (req: Request, res: Response) => {

}

export { getDiscussions, getMessages }
