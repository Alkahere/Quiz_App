# Quiz_App
Quiz app using Node.js
This is a simple quiz application built with Node.js, Express, and vanilla JavaScript. It allows users to answer multiple-choice questions and provides feedback on their performance.

Features
Users can answer multiple-choice questions.
Feedback is provided on each question, indicating whether the answer was correct or incorrect.
The total score is calculated based on the number of correct answers.
The application supports both backend and frontend functionalities.

Sure, here's an updated version of the README file with information about the API endpoints:

Quiz Application
This is a simple quiz application built with Node.js, Express, and vanilla JavaScript. It allows users to answer multiple-choice questions and provides feedback on their performance.

Features
Users can answer multiple-choice questions.
Feedback is provided on each question, indicating whether the answer was correct or incorrect.
The total score is calculated based on the number of correct answers.
The application supports both backend and frontend functionalities.
Installation
Clone the repository:


git clone https://github.com/Alkahere/quiz app.git
Install dependencies:


cd quiz app
npm install

Start the server:
npm run dev

http://localhost:3000



Backend API
The backend API provides the following endpoints:

POST /quiz/question: Fetches a random quiz question from the database.
POST /quiz/answers: Submits the user's quiz answers and returns feedback on each question along with the total score.
Endpoint Details
POST /quiz/question
Description: Fetches a random quiz question from the database.

Response: JSON object representing a quiz question with the following properties:
id: The unique identifier of the question.
question: The text of the question.
options: An array containing the options for the question.
correctOptionIndex: The index of the correct option in the options array.

POST /quiz/answers
Description: Submits the user's quiz answers and returns feedback on each question along with the total score.



Response: JSON object containing the following properties:
score: The total score achieved by the user.

question: The text of the question.
correct: A boolean indicating whether the user's answer was correct.
correctAnswer: The index of the correct option for the question.
Frontend Structure
The frontend consists of the following files:

index.html: HTML file containing the quiz interface.
style.css: CSS file for styling the quiz interface.
script.js: JavaScript file for handling quiz functionality and interaction with the backend API

