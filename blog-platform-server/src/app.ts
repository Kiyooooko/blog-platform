import express from 'express';
import cookieParser from 'cookie-parser';

import postsRoutes from './routes/posts';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import { adminAuth, userAuth } from './controllers/auth';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);

app.get('/admin', adminAuth, (req, res) => res.send('Admin Route'));
app.get('/basic', userAuth, (req, res) => res.send('User Route'));

app.get('/', (req, res) => res.send('Server running'));

export default app;
