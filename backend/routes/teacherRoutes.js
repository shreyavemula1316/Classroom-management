import express from 'express';
import {
    getStudentsInClassroom,
    updateStudent,
    deleteStudent,
    createTimetable
} from '../controllers/teacherController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeTeacher } from '../middleware/authorizeTeacher.js';

const router = express.Router();

router.get('/students', authenticateToken, authorizeTeacher, getStudentsInClassroom);
router.put('/students/:id', authenticateToken, authorizeTeacher, updateStudent);
router.delete('/students/:id', authenticateToken, authorizeTeacher, deleteStudent);
router.post('/timetables', authenticateToken, authorizeTeacher, createTimetable);

export default router;
