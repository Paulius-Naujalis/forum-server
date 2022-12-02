const express = require('express')

const { login, register, getSingleUser } = require("../controller/mainController")
const { loginValidate, registerValidate } = require("../middleware/authValidator")

const mainRouter = express.Router()

mainRouter.post('/register', registerValidate, register);

mainRouter.post('/login', loginValidate, login);

mainRouter.get('/profile/:secret', getSingleUser)

module.exports = mainRouter;
