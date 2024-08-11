import User from '../models/User.js';
import Classroom from '../models/Classroom.js';
import Timetable from '../models/Timetable.js';


export const getStudentsInClassroom = async (req, res) => {
    const teacherId = req.user.id;

    try {
        // Find the teacher and populate their classroom
        const teacher = await User.findById(teacherId).populate('classroom');
        
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }
        
        console.log('Teacher:', teacher); // Debugging line to inspect the teacher object

        if (teacher.role !== 'Teacher') {
            return res.status(403).send('Access denied');
        }

        if (!teacher.classroom) {
            return res.status(404).send('Classroom not assigned to teacher');
        }

        // Find all students in the teacher's classroom
        const students = await User.find({ classroom: teacher.classroom._id, role: 'Student' });
        res.status(200).json(students);
    } catch (err) {
        console.error('Error fetching students:', err); // Log detailed error
        res.status(500).send('Error fetching students');
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
        // Find the teacher and populate their classroom
        const teacher = await User.findById(teacherId).populate('classroom');
        if (!teacher || teacher.role !== 'Teacher') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find the classroom and check its hours
        const classroom = teacher.classroom;
        if (startTime < classroom.startTime || endTime > classroom.endTime) {
            return res.status(400).json({ message: 'Timetable period is out of classroom hours' });
        }

        // Check for overlapping periods
        const existingTimetables = await Timetable.find({ classroom: classroom._id, day });
        for (const timetable of existingTimetables) {
            if (startTime < timetable.endTime && endTime > timetable.startTime) {
                return res.status(400).json({ message: 'Periods overlap' });
            }
        }

        // Create and save the new timetable
        const newTimetable = new Timetable({
            classroom: classroom._id,
            subject,
            startTime,
            endTime,
            day,
            teacher: teacher._id // Add the teacher ID to the timetable
        });

        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error creating timetable', error: err.message });
    }
};
