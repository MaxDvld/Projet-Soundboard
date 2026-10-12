import UsersModel from "../Models/users.model.js";
import bcrypt from "bcrypt";

async function getAll(req, res) {
  try {
    const users = await UsersModel.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des utilisateurs",
    });
  }
}

async function getById(req, res) {
  try {
    const id = req.params.id;
    const users = await UsersModel.getById(id);
    if (!users) {
      return res.status(404).json({ error: "L'utilisateur demandé n'existe pas" });
    }
    res.json(users );
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération de l'utilisateur",
    });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const body = req.body || {};
    let users = await UsersModel.getById(id);
    if (!users) {
      return res
        .status(404)
        .json({ error: "L'utilisateur que vous modifiez n'existe pas" });
    }
    users = users[0];

    if (body.username) {
      users.us_username = body.username;
    }
    if (body.email) {
      users.us_email = body.email;
    }

    const updated = await UsersModel.update(id, users);
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification de l'utilisateur",
    });
  }
}

async function insert(req, res) {
  try {
    const body = req.body || {};
    if (!body.username || !body.email || !body.password) {
      return res
        .status(403)
        .json({ error: "username, email et password sont obligatoires" });
    }
    // hacher le mdp
    body.password = bcrypt.hashSync(body.password, 10);
    const inserted = await UsersModel.insert(body);
    res.status(201).json(inserted);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de l'insertion de l'utilisateur",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deleted = await UsersModel.deleteUser(id);
    if (deleted.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "L'utilisateur que vous supprimez n'existe pas" });
    }
    res.json(deleted);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de l'utilisateur",
    });
  }
}

export default {
  getAll,
  getById,
  update,
  deleteUser,
  insert,
};