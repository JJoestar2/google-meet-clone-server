import express from "express";

import UsersController from "../controllers/UsersController.js";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.get('/users', UsersController.getAll);
router.get('/users/:id', UsersController.getById);
router.get('/users/:email', UsersController.getByEmail);
router.post('/users/create', UsersController.create);
router.delete('/users/:id', UsersController.remove);

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

export default router;
