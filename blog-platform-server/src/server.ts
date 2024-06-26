import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import app from './app';

dotenvConfig({ path: './config/config.env' });

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
	throw new Error('MONGO_URL is not defined in environment variables');
}

mongoose.connect(mongoUrl)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
