const express = require('express');
const ConfigController = require('../controllers/config.controller');

const router = express.Router();

const configController = new ConfigController();
configController.register(router);

module.exports = router;
