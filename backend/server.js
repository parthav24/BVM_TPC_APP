import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tpcRoutes from './routes/tpcRoutes.js';
import tpoRoutes from './routes/tpoRoutes.js';
import guestRoutes from './routes/guestRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tpc', tpcRoutes);
app.use('/api/tpo', tpoRoutes);
app.use('/api/guest', guestRoutes);


app.listen(PORT, () => {
    console.log(`Listening from port ${PORT}`);
})