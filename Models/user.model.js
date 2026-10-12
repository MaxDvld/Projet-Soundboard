import Db from '../Config/db.js'




async function getAll() {
    const [rows] = await Db.query("SELECT id_user, username, mail, password FROM user");
    return rows;
}

async function getByLogin(login) {
    const [rows] = await Db.query(`SELECT id_user, username, mail, password FROM user WHERE username = ? OR mail = ?`, [login, login]);
    return rows[0];
}


async function getById(id) {
    const [rows] = await Db.query(`SELECT  id_user, username, mail, password FROM user WHERE id_user = ?`, [id]);
    return rows;
}

async function insert(user) {
    const inserted = await Db.query("INSERT INTO user (username, mail, password) VALUES (?,?,?)", [user.username, user.mail, user.password]);
    return inserted;
}

async function update(id, user) {
    const updated = await Db.query("UPDATE user SET username = ?, mail = ?, password = ? WHERE id_user = ?", [user.username, user.mail, user.password, id]);
    return updated;
}

async function deleteUser(id) {
    const deleted = await Db.query("DELETE FROM user WHERE id_user = ?" , [id]);
    return deleted;
}

export default {
    getAll,
    getById,
    insert,
    update,
    deleteUser,
    getByLogin,
}