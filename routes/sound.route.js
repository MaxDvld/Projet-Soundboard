import express from 'express';

import soundController from "../controllers/sound.controller.js";
const router= express.Router();

router.get('/', soundController.getAll);

router.get('/:id', soundController.getById);

router.post("/" , soundController.insert);

router.delete("/:id" , soundController.delete);

router.patch("/:id" ,soundController.update);

export default router;
