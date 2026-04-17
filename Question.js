const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  category: { type: String, enum: ['aptitude', 'coding', 'verbal', 'reasoning'], required: true },
  question: { type: String, required: true },
  options: [{ type: String }],          // 4 options
  correct: { type: Number, required: true },  // index 0-3
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  explanation: { type: String, default: '' }
});

module.exports = mongoose.model('Question', QuestionSchema);
