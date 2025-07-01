import { Request, Response } from 'express';
import { prisma } from '../models/user.model';

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const user = await prisma.user.create({
    data: { name, email, age },
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email, age },
  });
  res.json(user);
};

export const patchUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: (error as Error).message });
  }
};


