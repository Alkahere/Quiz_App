import express from 'express';
import Question from '../models/schema.js'; 

const router = express.Router();

router.get('/question', async (req, res) => {
    try {
        // Fetch a random question from the database
        const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomQuestion[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
