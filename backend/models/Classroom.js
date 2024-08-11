import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        required: true // e.g., ["Monday", "Wednesday", "Friday"]
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Teacher can be assigned later
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default mongoose.model('Classroom', classroomSchema);
