import React, {Dispatch, SetStateAction} from 'react';

import { Post } from '../../../types/Post';
import PostItem from './PostItem';

interface Props {
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[]>>;
	setSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

const PostList = ({ posts, setPosts, setSelectedPost }: Props) => {

	const handleDeletePost = async (id: string) => {
		try {
			await fetch(`/api/posts/${id}`, { method: 'DELETE' });
			setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div className='posts-grid'>
			{posts.map((post) => (
				<PostItem
					key={post._id}
					post={post}
					onClick={() => setSelectedPost(post)}
					onDelete={(event) => {
						event.stopPropagation();
						handleDeletePost(post._id);
					}}
				/>
			))}
		</div>
	);
};

export default PostList;
