import { Request, Response } from 'express';
import Post from '../models/Post';

export const getPosts = async (req: Request, res: Response) => {
	const posts = await Post.find();
	res.send(posts);
};

export const createPost = async (req: Request, res: Response) => {
	const newPost = await Post.create(req.body);
	res.send(newPost);
};

export const updatePost = async (req: Request, res: Response) => {
	const updatedPost = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true }
	);
	res.send(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
	const deletedPostId = req.params.id;
	await Post.findByIdAndDelete(deletedPostId);
	res.send(`Post ${deletedPostId} was deleted`);
};
