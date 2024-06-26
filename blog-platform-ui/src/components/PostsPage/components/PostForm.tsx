import React, { useState, useEffect } from 'react';

import { Post } from '../../../types/Post';

interface Props {
	selectedPost: Post | null;
	onAddPost: (title: string, content: string) => void;
	onUpdatePost: (id: string, title: string, content: string) => void;
	onCancel: () => void;
}

const PostForm = ({ selectedPost, onAddPost, onUpdatePost, onCancel }: Props) => {
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

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (selectedPost) {
			onUpdatePost(selectedPost._id, title, content);
		} else {
			onAddPost(title, content);
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
					<button type='button' onClick={onCancel}>Cancel</button>
				</div>
			) : (
				<button type='submit'>Add Post</button>
			)}
		</form>
	);
};

export default PostForm;
