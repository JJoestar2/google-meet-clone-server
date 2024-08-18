import express from "express";
import passport from "passport";

import "../strategies/jwt-strategy.js";

import UsersController from "../controllers/UsersController.js";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
// users
router.get('/users', UsersController.getAll);
router.get('/users/:id', UsersController.getById);
router.post('/users/create', UsersController.create);
router.delete('/users/:id', UsersController.remove);

// auth
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.delete(
    '/logout',
    passport.authenticate("jwt", { session: false }),
    (req, res) => AuthController.logout(req, res),
);

// refresh token
router.post('/refresh',
    passport.authenticate("jwt", { session: false }),
    (req, res) => AuthController.getNewToken(req, res),
);

export default router;
