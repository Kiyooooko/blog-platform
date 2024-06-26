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


	return (
		<div className='app-container'>
			<PostForm
				selectedPost={selectedPost}
				setPosts={setPosts}
				setSelectedPost={setSelectedPost}
			/>
			<PostList posts={posts} setPosts={setPosts} setSelectedPost={setSelectedPost} />
		</div>
	);
};

export default PostsPage;
