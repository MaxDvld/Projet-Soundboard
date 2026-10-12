import express from 'express';

import soundController from "../Controllers/sound.controller.js";
const router= express.Router();

router.get('/', soundController.getAll);

router.get('/:id', soundController.getById);

router.post("/" , soundController.insert);

router.delete("/:id" , soundController.deleteSound);

router.patch("/:id" ,soundController.update);

export default router;
