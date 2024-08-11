import express from 'express';
import {
    getStudentsInClassroom,
    getClassroomTimetable
} from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeStudent } from '../middleware/authorizeStudent.js';

const router = express.Router();


router.get('/students', authenticateToken, authorizeStudent, getStudentsInClassroom);
router.get('/timetable', authenticateToken, authorizeStudent, getClassroomTimetable);

export default router;
