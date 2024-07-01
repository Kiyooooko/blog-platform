import { Request, Response } from 'express';

import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error: any) {
		res.status(400).json({ message: 'An error occurred', error: error.message });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { role } = req.body;

	if (role && req.params.id) {
		try {
			if (role === 'admin') {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: req.params.id },
					req.body,
					{ new: true }
				);
				res.status(201).json({ message: 'Update successful', updatedUser });
			}
		} catch (error: any) {
			res.status(400).json({
				message: 'An error occurred',
				error: error.message,
			});
		}
	} else {
		res.status(400).json({ message: 'Role or ID not provided' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (user) {
			res.status(201).json({ message: 'User successfully deleted', user });
		} else {
			res.status(400).json({ message: 'User not found' });
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};