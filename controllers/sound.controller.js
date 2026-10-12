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
    if (soundUpdate.length === 0 )
        res.status(404).json({error : "Une erreur est survenu lors de la correction du son"})
    } catch (error) {
        
    }


}

async function insert(req,res) {
    try {
        const body = req.body
        const sound = await soundModel.insert(body)
        res.status(201).json(sound)
    } catch (error) {
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