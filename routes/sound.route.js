import express from 'express';
import upload from "../Middleware/upload.middleware.js";
import soundController from "../Controllers/sound.controller.js";
const router= express.Router();

router.get('/', soundController.getAll);

router.get('/:id', soundController.getById);

router.post("/" ,  upload.single('audio'), soundController.insert);

router.delete("/:id" , soundController.deleteSound);

router.patch("/:id" ,soundController.update);

export default router;
