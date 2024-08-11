import User from '../models/User.js';
import Classroom from '../models/Classroom.js';
import Timetable from '../models/Timetable.js';

// View all students in the teacher's classroom
export const getStudentsInClassroom = async (req, res) => {
    const teacherId = req.user.id;

    try {
        const teacher = await User.findById(teacherId).populate('classroom');
        if (!teacher || teacher.role !== 'Teacher') return res.status(403).send('Access denied');

        const students = await User.find({ classroom: teacher.classroom._id, role: 'Student' });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).send('Error fetching students');
    }
};

// Update student details
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        const student = await User.findById(id);
        if (!student || student.role !== 'Student') return res.status(404).send('Student not found');

        student.email = email || student.email;
        student.password = password || student.password;

        await student.save();
        res.status(200).json(student);
    } catch (err) {
        res.status(500).send('Error updating student');
    }
};

// Delete student
export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).send('Student deleted');
    } catch (err) {
        res.status(500).send('Error deleting student');
    }
};

// Create timetable for classroom
export const createTimetable = async (req, res) => {
    const teacherId = req.user.id;
    const { subject, startTime, endTime, day } = req.body;

    try {
        const teacher = await User.findById(teacherId).populate('classroom');
        if (!teacher || teacher.role !== 'Teacher') return res.status(403).send('Access denied');

        const classroom = teacher.classroom;
        if (startTime < classroom.startTime || endTime > classroom.endTime) {
            return res.status(400).send('Timetable period is out of classroom hours');
        }

        // Check for overlapping periods
        const existingTimetables = await Timetable.find({ classroom: classroom._id, day });
        for (const timetable of existingTimetables) {
            if (startTime < timetable.endTime && endTime > timetable.startTime) {
                return res.status(400).send('Periods overlap');
            }
        }

        const newTimetable = new Timetable({
            classroom: classroom._id,
            subject,
            startTime,
            endTime,
            day
        });

        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (err) {
        res.status(500).send('Error creating timetable');
    }
};
