import User from '../models/User.js';
import Timetable from '../models/Timetable.js';

// View all students in the student's classroom
export const getStudentsInClassroom = async (req, res) => {
    const studentId = req.user.id;

    try {
        const student = await User.findById(studentId).populate('classroom');
        if (!student || student.role !== 'Student') return res.status(403).send('Access denied');

        const students = await User.find({ classroom: student.classroom._id, role: 'Student' });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).send('Error fetching students');
    }
};

// View the timetable for the student's classroom
export const getClassroomTimetable = async (req, res) => {
    const studentId = req.user.id;

    try {
        const student = await User.findById(studentId).populate('classroom');
        if (!student || student.role !== 'Student') return res.status(403).send('Access denied');

        const timetable = await Timetable.find({ classroom: student.classroom._id });
        res.status(200).json(timetable);
    } catch (err) {
        res.status(500).send('Error fetching timetable');
    }
};
