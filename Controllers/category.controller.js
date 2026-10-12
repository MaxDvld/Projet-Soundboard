import CategoryModel from '../Models/category.model.js'

async function getAll(req, res) {
    try {
        const categories = await CategoryModel.getAll();
        res.json(categories);
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des catégories");
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des catégories" })
    }
}

async function getById(req, res) {
    try {
        const id = req.params.id;
        const category = await CategoryModel.getById(id);
        res.json(category[0]);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération de la catégorie" })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;

        let categoryToUpdate = await CategoryModel.getById(id);
        if (categoryToUpdate.length === 0) {
            return res.status(404).json({ error: "La catégorie que vous modifiez n'existe pas" })
        }

        categoryToUpdate = categoryToUpdate[0];

        if (body.name) {
            categoryToUpdate.name = body.name;
        }

        await CategoryModel.update(id, categoryToUpdate);
        res.json({ message: "Votre catégorie a bien été modifiée", category: categoryToUpdate });
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la modification de la catégorie" });
    }
}

async function insert(req, res) {
    try {
        const body = req.body;
        if (!body.name) {
            return res.status(403).json({ error: "Le nom de la catégorie est obligatoire !" })
        }

        const inserted = await CategoryModel.insert(body);
        res.status(201).json(inserted);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'insertion de la catégorie" });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const category = await CategoryModel.getById(id);
        if (category.length === 0) {
            return res.status(404).json({ error: "La catégorie n'existe pas !" })
        }
        const deleted = await CategoryModel.deleteCategory(id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression de la catégorie" })
    }
}

export default {
    getAll,
    getById,
    update,
    insert,
    deleteCategory
}
