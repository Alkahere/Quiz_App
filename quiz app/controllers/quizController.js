
export const submitQuizAnswers = (req, res) => {
    try {
        const userAnswers = req.body.answers;
        let score = 0;
        const feedback = [];

        for (let i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === quizQuestions[i].correctAnswer) {
                score++;
                feedback.push({ question: quizQuestions[i].question, correct: true });
            } else {
                feedback.push({ question: quizQuestions[i].question, correct: false, correctAnswer: quizQuestions[i].correctAnswer });
            }
        }

        res.json({ score, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
