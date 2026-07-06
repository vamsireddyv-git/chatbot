import express from 'express'
import aiRouter from './routes/aiRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
    origin : ["http://localhost:5174",process.env.FRONTEND_URL],
    methods : ["GET","POST"]
}))
app.use(express.json());
app.use('/api/ai', aiRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});