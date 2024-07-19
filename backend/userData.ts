import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "./middleware";

const prisma = new PrismaClient();

const getUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user data.");
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const { description, interests } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.body.userId },
      data: {
        description,
        interests: { set: interests },
      },
    });

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("Error updating user data", error);
    res.status(500).send("Error updating user data.");
  }
};

export { getUserInfo, updateProfile };
