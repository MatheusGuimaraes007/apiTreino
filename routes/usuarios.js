const express = require('express');
const router = express.Router();

const controllerUsuario = require('../controllers/usuarios-controller');

router.post('/cadastro', controllerUsuario.cadastrarUsuario);
router.post('/login', controllerUsuario.loginUsuario);

module.exports = router;
