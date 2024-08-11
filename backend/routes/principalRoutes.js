import express from 'express';
import {
    getTeachers,
    getStudents,
    updateUser,
    deleteUser,
    createClassroom,
    assignClassroomToTeacher,
    getTimetables,
    updateTimetable,
    assignStudentsToClassroom
} from '../controllers/principalController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizePrincipal } from '../middleware/autherizePrincipal.js';

const router = express.Router();

router.get('/teachers', authenticateToken, authorizePrincipal, getTeachers);
router.get('/students', authenticateToken, authorizePrincipal, getStudents);
router.put('/users/:id', authenticateToken, authorizePrincipal, updateUser);
router.delete('/users/:id', authenticateToken, authorizePrincipal, deleteUser);
router.post('/classrooms', authenticateToken, authorizePrincipal, createClassroom);
router.post('/assign-classroom', authenticateToken, authorizePrincipal, assignClassroomToTeacher);
router.get('/timetables', authenticateToken, authorizePrincipal, getTimetables);
router.put('/timetables/:id', authenticateToken, authorizePrincipal, updateTimetable);
router.post('/assign-students-to-classroom', authenticateToken, authorizePrincipal, assignStudentsToClassroom);

export default router;
