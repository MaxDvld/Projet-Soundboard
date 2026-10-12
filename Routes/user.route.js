import e from "express";
import userController from "../Controllers/user.controller.js"

const router = e.Router();

router.get("/", userController.getAll);

// /users/:id
router.get('/:id', userController.getById)

router.patch('/:id', userController.update)

router.post("/", userController.insert)

router.delete("/:id", userController.deleteUser);

export default router;
