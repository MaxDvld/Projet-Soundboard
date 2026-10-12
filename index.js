import express from 'express';
import dotenv from 'dotenv';
import authroute from './Routes/auth.route.js'
import UsersRoute from './Routes/users.route.js'
import checkToken from './Middleware/auth.middleware.js'

const app = express();
dotenv.config();
app.use(express.json());
app.use("/auth", authroute);
app.use("/users", checkToken, UsersRoute);
app.get('/', (req, res) => {
    res.json({status: 'OK'});
})
app.listen(process.env.SERVER_PORT, () => {
    console.log('http://127.0.0.1:' + process.env.SERVER_PORT);
    console.log('http://localhost:' + process.env.SERVER_PORT);
})