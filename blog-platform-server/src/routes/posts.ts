import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts';

const router = Router();

router.get('/posts', getPosts);
router.post('/posts/create', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
