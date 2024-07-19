import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

const getTopLocations = async (req: Request, res: Response) => {

}

export { getTopLocations }
