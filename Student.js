const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },

  // Academic Info
  cgpa: { type: Number, min: 0, max: 10, default: 0 },
  branch: { type: String, default: '' },
  graduationYear: { type: Number, default: new Date().getFullYear() + 1 },

  // Skills
  skills: [{ type: String }],
  internshipCount: { type: Number, default: 0 },
  projectCount: { type: Number, default: 0 },
  certificationCount: { type: Number, default: 0 },
  aptitudeScore: { type: Number, default: 0 },   // out of 100

  // Prediction results
  placementProbability: { type: Number, default: null },
  resumeScore: { type: Number, default: null },
  weakAreas: [{ type: String }],
  recommendations: [{ type: String }],

  // Resume
  resumePath: { type: String, default: '' },

  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StudentSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('Student', StudentSchema);
