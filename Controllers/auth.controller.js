import UsersModel from "../Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function register(req, res) {
    try {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, 10);
        const inserted = await UsersModel.insert(body);
        res.status(201).json(inserted);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });

    }
}

async function login(req, res) {
    try {

        const body = req.body;
        console.log(body)

        if (!body.login || !body.password) {
            return res.status(403).json({ error: "Identifiant incorrect 1" })
        }

        const user = await UsersModel.getByLogin(body.login);
        console.log(user)
        if(!user){
            return res.status(403).json({ error: "Identifiant incorrect 2" })
        }

        const compare = bcrypt.compareSync(body.password, user.password);
        if(compare == false) {
            return res.status(403).json({ error: "Identifiant incorrect 3" })
        }

        const token = jwt.sign({
            user : user
        }, process.env.JWT_SECRET, { "expiresIn" : "1h"} )
        res.json(token);

        console.log(token)
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la connexion" });
    }
}

export default{
    register,
    login
}