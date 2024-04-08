import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import quizRoutes from './routes/quizRoutes.js';
import answerRoute from './routes/answerRoute.js';
import dotenv from  "dotenv";
import mongoose from './models/connection.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
    dotenv.config();
    const app = express();

    // Middleware to parse JSON bodies
    app.use(bodyParser.json());
    app.use(express.static(join(__dirname, 'public')));

    // Route to serve frontend HTML file
    app.get('/', (req, res) => {
        res.sendFile(join(__dirname, 'public', 'index.html'));
    });

    app.use('/quiz', quizRoutes); 
    app.use('/answer', answerRoute);

    // Endpoint to get a random question
    app.get('/quiz/question', async (req, res) => {
        try {
            const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
            res.json(randomQuestion[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Endpoint to submit an answer
    app.post('/quiz/answer', async (req, res) => {
        const { questionId, selectedOptionIndex } = req.body;
        try {
            const question = await question.findById(questionId);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            const correctOptionIndex = question.correctOptionIndex;
            const isCorrect = selectedOptionIndex === correctOptionIndex;
            res.json({ isCorrect, correctOptionIndex });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
