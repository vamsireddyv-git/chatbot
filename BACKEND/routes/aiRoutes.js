import express from 'express'
import {generateResponse} from '../controllers/generate.js'
const aiRouter = express.Router();

aiRouter.post('/generate', generateResponse);

export default aiRouter;