import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOptionIndex: Number
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
