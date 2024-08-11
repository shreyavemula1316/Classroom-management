import express from 'express';
import { createPrincipalAccount, createTeacherAccount,createStudentAccount, login } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizePrincipal } from '../middleware/autherizePrincipal.js';

const router = express.Router();


router.get('/create-principal', createPrincipalAccount);
router.post('/create-teacher', authenticateToken, authorizePrincipal, createTeacherAccount);
router.post('/create-student', authenticateToken, authorizePrincipal, createStudentAccount);
router.post('/login', login);

export default router;
