import React from 'react';

import { Post } from '../../../types/Post';

interface Props {
	post: Post;
	onClick: () => void;
	onDelete: (event: React.MouseEvent) => void;
}

const PostItem = ({ post, onClick, onDelete }: Props) => {
	return (
		<div className='post-item' onClick={onClick}>
			<div className='posts-header'>
				<button onClick={onDelete}>x</button>
			</div>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
		</div>
	);
};

export default PostItem;
