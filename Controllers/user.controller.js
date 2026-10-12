import userModel from "../Models/user.model.js";
import bcrypt from 'bcrypt';



async function getAll(req, res) {
    try {
        const user = await userModel.getAll();
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des user" })
    }
}

async function getById(req, res) {
    try {
        const id = req.params.id;
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ erreur: "Le user n'existe pas" });
        }
        res.json(user);
    } catch (error) {console.error(error)
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du user" })
    }
}


async function insert(req, res) {
    try {
        const body = req.body;

        body.password = bcrypt.hashSync(body.password, 10);
        if(!body.username || !body.mail || !body.password){
            return res.status(403).json({error : "Tout les champs sont requis !"})
        }
        const inserted = await userModel.insert(body);
        res.status(201).json({message: "Votre ajout d'utilisateur à bien été fait", user: body})
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'insertion du user" })
    }
}


async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ erreur: "Le user n'existe pas" });
        }

        if (body.mail) {
            user.mail = body.mail;
        }

        if (body.username) {
            user.username = body.username;
        }

        if (body.password) {
            user.password = bcrypt.hashSync(body.password,10);
        }

        const updated = await userModel.update(id,user);
        res.json({message : "Votre modification à bien été effectué", user});
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la modification du user" })
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await userModel.getById(id);
        if (!user) {
            return res.status(404).json({ erreur: "Le user n'existe pas" });
        }
        const deleted = await userModel.deleteUser(id);
        res.json({message : "Votre suppression à bien été faites", user});
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du user" })
    }
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteUser
}