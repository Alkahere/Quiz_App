let userAnswers = [];

function submitAnswer(questionId, selectedOptionIndex) {
    userAnswers.push({ questionId, selectedOptionIndex });
}

async function fetchInitialQuestionId() {
    try {
        const response = await fetch('http://localhost:3000/quiz/question');
        if (!response.ok) {
            throw new Error('Failed to fetch initial question ID');
        }
        const data = await response.json();
        return data._id;
    } catch (error) {
        console.error('Error fetching initial question ID:', error);
        throw error;
    }
}

async function renderQuestion(_id) {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');

    // Clear previous question and options
    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    try {
        // Fetch the question with the provided question ID
        const response = await fetch(`http://localhost:3000/quiz/question`);
        if (!response.ok) {
            throw new Error('Failed to fetch question');
        }

        const question = await response.json();

        // Render question
        questionContainer.textContent = question.question;

        // Render options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => submitAnswer(question._id, index));
            optionsContainer.appendChild(optionElement);
        });
    } catch (error) {
        console.error('Error fetching/rendering question:', error);
    }
}

document.getElementById('next-btn').addEventListener('click', async () => {
    if (userAnswers.length < 10) {
        console.log('Please attempt all 10 questions before proceeding.');
        return;
    }

    try {
        const response = await fetch('/quiz/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userAnswers })
        });

        if (!response.ok) {
            throw new Error('Failed to submit answers');
        }

        const result = await response.json();
        console.log(result);
        displayResults(result); // Display scores
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred. Please try again.');
    }
});

function displayResults(result) {
    // Logic to display scores to the user
    // For example:
    const scoreContainer = document.getElementById('score');
    scoreContainer.textContent = `Total Score: ${result.totalScore}`;
    // You can also display correct and incorrect answers if needed
}

async function initializeQuiz() {
    try {
        const initialQuestionId = await fetchInitialQuestionId();
        await renderQuestion(initialQuestionId);
    } catch (error) {
        console.error('Error initializing quiz:', error);
    }
}

initializeQuiz();
