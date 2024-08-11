import User from '../models/User.js';
import Classroom from '../models/Classroom.js';



// View all teachers
export const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).send('Error fetching teachers');
    }
};

// View all students
export const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).send('Error fetching students');
    }
};

// Update user details
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, role, classroom } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send('User not found');

        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;
        user.classroom = classroom || user.classroom;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error updating user');
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).send('User deleted');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
};

// Create classroom
export const createClassroom = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;

    try {
        const newClassroom = new Classroom({ name, startTime, endTime, days });
        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (err) {
        res.status(500).send('Error creating classroom');
    }
};

// Assign classroom to teacher
export const assignClassroomToTeacher = async (req, res) => {
    const { teacherId, classroomId } = req.body;

    try {
        const teacher = await User.findById(teacherId);
        const classroom = await Classroom.findById(classroomId);

        if (!teacher || teacher.role !== 'Teacher') return res.status(400).send('Invalid teacher');
        if (!classroom) return res.status(400).send('Classroom not found');
        if (teacher.classroom) return res.status(400).send('Teacher is already assigned to a classroom');

        teacher.classroom = classroomId;
        classroom.teacher = teacherId;

        await teacher.save();
        await classroom.save();

        res.status(200).json({ teacher, classroom });
    } catch (err) {
        res.status(500).send('Error assigning classroom');
    }
};

// Optionally: View and edit timetable
export const getTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find().populate('classroom');
        res.status(200).json(timetables);
    } catch (err) {
        res.status(500).send('Error fetching timetables');
    }
};

export const updateTimetable = async (req, res) => {
    const { id } = req.params;
    const { subject, startTime, endTime, day } = req.body;

    try {
        const timetable = await Timetable.findById(id);
        if (!timetable) return res.status(404).send('Timetable not found');

        timetable.subject = subject || timetable.subject;
        timetable.startTime = startTime || timetable.startTime;
        timetable.endTime = endTime || timetable.endTime;
        timetable.day = day || timetable.day;

        await timetable.save();
        res.status(200).json(timetable);
    } catch (err) {
        res.status(500).send('Error updating timetable');
    }
};
