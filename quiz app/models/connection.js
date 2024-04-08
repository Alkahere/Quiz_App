import mongoose from 'mongoose';

// MongoDB URI
const mongoURI = "mongodb+srv://root:root123@cluster0.t9s4ug8.mongodb.net/quizapp";

// Connect to MongoDB
mongoose.connect(mongoURI, {
    
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

export default mongoose;
