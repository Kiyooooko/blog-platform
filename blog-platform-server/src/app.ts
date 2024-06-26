// @ts-ignore
import express from 'express';
import postsRoutes from './routes/posts';

const app = express();

app.use(express.json());

app.use('/api', postsRoutes);

app.get('/', (req, res) => res.send('Server running'));

export default app;
