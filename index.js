import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authroute from './Routes/auth.route.js'
import UsersRoute from './Routes/user.route.js'
import checkToken from './Middleware/auth.middleware.js'
import CategoryRoute from './Routes/category.route.js'
import soundRoute from './Routes/sound.route.js'

const app = express();

dotenv.config();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/audio', express.static('uploads'));

app.use("/auth", authroute);
app.use("/users", checkToken, UsersRoute);
app.use("/category", checkToken, CategoryRoute);
app.use("/sound", checkToken, soundRoute);

app.get('/', (req, res) => {
    res.json({status: 'OK'});
})

app.listen(process.env.SERVER_PORT, function () {
    console.log(`http://127.0.0.1:${process.env.SERVER_PORT}/`);
    console.log(`http://localhost:${process.env.SERVER_PORT}/`);
})
