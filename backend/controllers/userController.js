import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createPrincipalAccount = async (req, res) => {
    try {
        const principal = await User.findOne({ email: 'principal@classroom.com' });
        if (!principal) {
            const newPrincipal = new User({
                email: 'principal@classroom.com',
                password: 'Admin',
                role: 'Principal'
            });
            await newPrincipal.save();
            res.status(200).send('Principal account created');
        } else {
            res.status(200).send('Principal account already exists');
        }
    } catch (err) {
        res.status(500).send('Error creating principal account');
    }
};

export const createTeacherAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Teacher account already exists');
        }
        const newTeacher = new User({
            email,
            password,
            role: 'Teacher'
        });
        await newTeacher.save();
        res.status(201).send('Teacher account created');
    } catch (err) {
        res.status(500).send('Error creating teacher account');
    }
};

export const createStudentAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Student account already exists');
        }
        const newStudent = new User({
            email,
            password,
            role: 'Student'
        });
        await newStudent.save();
        res.status(201).send('Student account created');
    } catch (err) {
        res.status(500).send('Error creating student account');
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET , { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
};
