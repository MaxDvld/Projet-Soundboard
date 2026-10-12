import express from 'express'
import dotenv from 'dotenv'

import CategoryRoute from './Routes/category.route.js'

const app = express();

dotenv.config();

app.use(express.json());

app.use("/category", CategoryRoute);

app.get("/", (req, res) => {
    res.json({ status: "OK" })
})

app.listen(process.env.SERVER_PORT, function () {
    console.log(`http://127.0.0.1:${process.env.SERVER_PORT}/`);
    console.log(`http://localhost:${process.env.SERVER_PORT}/`);
})
