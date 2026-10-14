import soundModel from "../models/sound.model.js"


async function getAll(req,res) {
    try {
        const sound = await soundModel.getAll();
        res.json(sound);
    } catch (error) {
        res.status(500).json({error : "Une erreur est survenue lors de la récupération du son"})
    }
}

async function getById(req,res) {
    try {
        const sound = await soundModel.getById(id)
        res.jsond(sound);
    } catch (error) {
        res.status(500).json({error : "Une erreur est survenue lors de la récupération du son"})
    }

}

async function update(req,res) {
    try {
        const id = req.params.id
        const body = req.body

        let soundUpdate = await soundModel.getById(id)
        if (soundUpdate.length === 0) {
            return res.status(404).json({error : "Le son que vous modifiez n'existe pas"})
        }

        soundUpdate = soundUpdate[0]
        if (body.name) soundUpdate.name = body.name
        if (body.id_category) soundUpdate.id_category = body.id_category
        if (body.link) soundUpdate.link = body.link

        await soundModel.update(id, soundUpdate)
        res.json({ message: "Votre son a bien été modifié", sound: soundUpdate })
    } catch (error) {
        res.status(500).json({error : "Une erreur est survenue lors de la modification du son"})
    }
}

async function insert(req,res) {
    try {
        const body = req.body

        if (!req.file) {
            return res.status(400).json({ error: "Le fichier audio est obligatoire" })
        }
        if (!body.name || !body.id_category) {
            return res.status(400).json({ error: "Le nom et la catégorie du son sont obligatoires" })
        }

        const added = new Date().toISOString().slice(0, 10)
        const link = `audio/${req.file.filename}`
        const inserted = await soundModel.insert({
            name: body.name,
            link,
            added,
            id_category: body.id_category
        })

        res.status(201).json({
            id_sound: inserted.insertId,
            name: body.name,
            link,
            added,
            id_category: Number(body.id_category)
        })
    } catch (error) {
        console.error("Erreur lors de l'insertion du son", error)
        res.status(500).json({error : "Une erreur est survenue lors de l'insertion du son"})
    }
}

    async function deleteSound(req,res) {
        try {
            const id = req.params.id
            const sound = await soundModel.delete(id)
            res.status(200).json(sound)
        } catch (error) {
            res.status(500).json({error : "Une erreur est survenue lors de la suppression du son"})
        }
    }

        export default{
            getAll,
            getById,
            update,
            insert,
            deleteSound
        }