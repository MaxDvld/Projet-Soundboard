import express from 'express'
import CategoryController from '../Controllers/category.controller.js';

const router = express.Router();

router.get('/', CategoryController.getAll)

router.get('/:id', CategoryController.getById);

router.patch('/:id', CategoryController.update);

router.delete('/:id', CategoryController.deleteCategory);

router.post('/', CategoryController.insert);

export default router;
