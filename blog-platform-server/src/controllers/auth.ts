import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (password.length < 6) {
		return res.status(400).json({ message: 'Password less than 6 characters' });
	}

	try {
		const hash = await bcrypt.hash(req.body.password, 10);

		const user = await User.create({
			username,
			password: hash,
		});

		const maxAge = 3 * 60 * 60; // 3hrs in sec
		const token = jwt.sign(
			{ id: user._id, username, role: user.role },
			process.env.JWT_SECRET!,
			{
				expiresIn: maxAge,
			}
		);

		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: maxAge * 1000, // 3hrs in ms
		});

		res.status(201).json({
			message: 'User is successfully created',
			user: user._id,
		});
	} catch (error: any) {
		return res.status(400).json({
			message: 'User cannot be created',
			error: error.message,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			message: 'Username or Password are not present',
		});
	}
	try {
		const user = await User.findOne({ username });
		if (!user) {
			res.status(400).json({
				message: 'Login not successful',
				error: 'User not found',
			});
		} else {
			const bcryptResult = await bcrypt.compare(password, user.password);
			if (bcryptResult) {
				const maxAge = 3 * 60 * 60; // 3hrs in sec
				const token = jwt.sign(
					{ id: user._id, username, role: user.role },
					process.env.JWT_SECRET!,
					{
						expiresIn: maxAge,
					}
				);

				res.cookie('jwt', token, {
					httpOnly: true,
					maxAge: maxAge * 1000, // 3hrs in ms
				});

				res.status(201).json({
					message: 'User successfully Logged in',
					user: user._id,
				});
			} else {
				res.status(400).json({ message: 'Login is not successful' });
			}
		}
	} catch (error: any) {
		res.status(400).json({
			message: 'An error occurred',
			error: error.message,
		});
	}
};

//TODO: create type for decodedToken

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
			if (err) {
				return res.status(401).json({ message: 'Not authorized' });
			} else {
				if (decodedToken.role !== 'admin') {
					return res.status(401).json({ message: 'Not authorized' });
				} else {
					next();
				}
			}
		});
	} else {
		return res.status(401).json({ message: 'Not authorized, token is not available' });
	}
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
			if (err) {
				return res.status(401).json({ message: 'Not authorized' });
			} else {
				if (decodedToken.role !== 'Basic') {
					return res.status(401).json({ message: 'Not authorized' });
				} else {
					next();
				}
			}
		});
	} else {
		return res.status(401).json({ message: 'Not authorized, token is not available' });
	}
};