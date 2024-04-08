import express from 'express';
import Question from '../models/schema.js';

// Create a router instance
const router = express.Router();
router.use(express.json());

// Route handler for submitting user answers
router.post('/answers', async (req, res) => {
    const { userAnswers } = req.body;
    let totalScore = 0;
    let correctAnswers = [];
    let incorrectAnswers = [];

    try {
        for (const answer of userAnswers) {
            const question = await Question.findById(answer.questionId);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }

            // Compare user's selected option with the correct option
            if (answer.selectedOptionIndex === question.correctOptionIndex) {
                totalScore += 1; // Increment score if answer is correct
                correctAnswers.push({ question: question.question, correctOptionIndex: question.correctOptionIndex });
            } else {
                incorrectAnswers.push({ question: question.question, correctOptionIndex: question.correctOptionIndex });
            }
        }

        // Send the total score and correct/incorrect answers to the frontend
        res.json({ totalScore, correctAnswers, incorrectAnswers });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
});

// Export the router
export default router;
