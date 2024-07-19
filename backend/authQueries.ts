import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "./middleware";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).send("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        followers: 0,
        following: 0,
        description: "",
        interests: [],
      },
      select: {
        id: true,
        username: true,
      },
    });

    res
      .status(201)
      .json({ message: "Successfully created user.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, username: true, password: true },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Incorrect password.");
    }

    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in.");
  }
};

export { createUser, login };
