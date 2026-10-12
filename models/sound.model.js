import db from "../config/db.config.js"

async function getAll() {
    const [rows] = await db.query("SELECT id_sound, name, link, added, id_category FROM sound");
    return rows;
}

async function getById(id) {
    const [rows] = await db.query("SELECT id_sound, name, link, added, id_category FROM sound WHERE id_sound = ?", 
        [id]);
    return rows;
}

async function insert(sound) {
    const [rows] = await db.query("INSERT INTO sound id_sound, name, link, added, id_category VALUES (?, ?, ?, ?, ?)", 
        [sound.id_sound, sound.name, sound.link, sound.added, sound.id_category]);
    return rows;
}

async function deleteSound(id) {
    const [rows] = await db.query("DELETE FROM sound WHERE id_sound = ?", [id]);
    return rows;
}

async function update(id, sound) {
    const [rows] = await db.query("UPDATE sound SET name = ?, link = ?, added = ?, id_category = ? WHERE id_sound = ?", 
        [sound.name, sound.link, sound.added, sound.id_category, id]);
    return rows;
}

export default{
    getAll,
    getById,
    insert,
    deleteSound,
    update
}   