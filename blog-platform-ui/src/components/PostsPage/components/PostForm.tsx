import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';

import { Post } from '../../../types/Post';

interface Props {
	selectedPost: Post | null;
	setPosts: Dispatch<SetStateAction<Post[]>>;
	setSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

const PostForm = ({ selectedPost, setPosts, setSelectedPost }: Props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (selectedPost) {
			setTitle(selectedPost.title);
			setContent(selectedPost.content);
		} else {
			setTitle('');
			setContent('');
		}
	}, [selectedPost]);

	const handleAddPost = async (title: string, content: string) => {
		try {
			const response = await fetch('/api/posts/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content }),
			});
			const newPost = await response.json();
			setTitle('');
			setContent('');
			setPosts((prevPosts) => [newPost, ...prevPosts]);
		} catch (error) {
			console.error('Error adding post:', error);
		}
	};

	const handleUpdatePost = async (id: string, title: string, content: string) => {
		try {
			const response = await fetch(`/api/posts/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content }),
			});
			const updatedPost = await response.json();
			setPosts((prevPosts) => {
				return prevPosts.map((post) =>
					post._id === id ? updatedPost : post
				)
			});
			setSelectedPost(null);
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (selectedPost) {
			handleUpdatePost(selectedPost._id, title, content);
		} else {
			handleAddPost(title, content);
		}
	};

	return (
		<form className='post-form' onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder='Title'
				required
			/>
			<textarea
				value={content}
				onChange={(event) => setContent(event.target.value)}
				placeholder='Content'
				rows={10}
				required
			/>
			{selectedPost ? (
				<div className='edit-buttons'>
					<button type='submit'>Save</button>
					<button type='button' onClick={() => setSelectedPost(null)}>Cancel</button>
				</div>
			) : (
				<button type='submit'>Add Post</button>
			)}
		</form>
	);
};

export default PostForm;
