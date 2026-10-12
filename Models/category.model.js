import Db from '../Config/db.js'

async function getAll() {
    const [rows] = await Db.query("SELECT id_category, name FROM category");
    return rows;
}

async function getById(id) {
    const [rows] = await Db.query("SELECT id_category, name FROM category WHERE id_category = ?", [id]);
    return rows;
}

async function update(id, category) {
    const status = await Db.query("UPDATE category SET name = ? WHERE id_category = ?",
        [category.name, id]);
    return status;
}

async function insert(category) {
    const inserted = await Db.query("INSERT INTO category (name) VALUES (?)",
        [category.name]);
    return inserted;
}

async function deleteCategory(id) {
    const deleted = await Db.query("DELETE FROM category WHERE id_category = ?", [id]);
    return deleted;
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteCategory
}
