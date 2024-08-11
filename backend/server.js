import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB';
import userRoutes from './routes/userRoutes.js';
import principalRoutes from './routes/principalRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';



const app = express();
dotenv.config();


app.use(express.json());

connectToMongoDB();
app.use('/api', userRoutes);
app.use('/api/principals', principalRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);


app.listen(5000, () =>{
    console.log('server running on port 5000');
});