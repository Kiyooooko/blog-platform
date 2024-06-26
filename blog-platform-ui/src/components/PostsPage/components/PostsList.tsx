import React from 'react';

import { Post } from '../../../types/Post';
import PostItem from './PostItem';

interface Props {
	posts: Post[];
	onPostClick: (post: Post) => void;
	onDeletePost: (id: string) => void;
}

const PostList = ({ posts, onPostClick, onDeletePost }: Props) => {
	return (
		<div className='posts-grid'>
			{posts.map((post) => (
				<PostItem
					key={post._id}
					post={post}
					onClick={() => onPostClick(post)}
					onDelete={(event) => {
						event.stopPropagation();
						onDeletePost(post._id);
					}}
				/>
			))}
		</div>
	);
};

export default PostList;
