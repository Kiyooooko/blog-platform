import React, { useEffect, useState } from 'react';

import { Post } from '../../types/Post';
import PostForm from './components/PostForm';
import PostList from './components/PostsList';
import './index.css';

const PostsPage = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('/api/posts');
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchPosts();
	}, []);

	const handleAddPost = async (title: string, content: string) => {
		try {
			const response = await fetch('/api/posts/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content }),
			});
			const newPost = await response.json();
			setPosts([newPost, ...posts]);
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
			const updatedPostsList = posts.map((post) =>
				post._id === id ? updatedPost : post
			);
			setPosts(updatedPostsList);
			setSelectedPost(null);
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const handleDeletePost = async (id: string) => {
		try {
			await fetch(`/api/posts/${id}`, { method: 'DELETE' });
			const updatedPosts = posts.filter((post) => post._id !== id);
			setPosts(updatedPosts);
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const handlePostClick = (post: Post) => {
		setSelectedPost(post);
	};

	const handleCancel = () => {
		setSelectedPost(null);
	};

	return (
		<div className='app-container'>
			<PostForm
				selectedPost={selectedPost}
				onAddPost={handleAddPost}
				onUpdatePost={handleUpdatePost}
				onCancel={handleCancel}
			/>
			<PostList posts={posts} onPostClick={handlePostClick} onDeletePost={handleDeletePost} />
		</div>
	);
};

export default PostsPage;
