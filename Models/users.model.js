import db from "../Config/db.js";

async function getAll() {
  const [rows] = await db.query(
    "SELECT id_user, username, mail FROM user"
  );
  return rows;
}

async function getById(id) {
  const [rows] = await db.query(
    "SELECT id_user, username, mail FROM user WHERE id_user = ?",
    [id]
  );
  return rows[0];
}

async function insert(user) {
  const [result] = await db.query(
    "INSERT INTO user (username, password, mail) VALUES (?, ?, ?, ?)",
    [user.username, user.password, user.mail]
  );
  return result;
}

async function update(id, user) {
  const [result] = await db.query(
    "UPDATE user SET username = ?, mail = ? WHERE id_user = ?",
    [user.username, user.mail, id]
  );
  return result;
}

async function deleteUser(id) {
  const [result] = await db.query("DELETE FROM user WHERE id_user = ?", [id]);
  return result;
}

export default {
  getAll,
  getById,
  insert,
  update,
  deleteUser,
};