var express = require('express');
var noteController = require('../Controllers/noteController');
const validateToken = require('../Middlewares/validateToken');

var router = express.Router();



// Rutas de notas
router.get('/note/getNotes', validateToken.verify, noteController.getNotes);
router.post('/note/createNote', validateToken.verify, noteController.createNote);
router.post('/note/updateNote', validateToken.verify, noteController.updateNote);
router.post('/note/searchNote', validateToken.verify, noteController.searchNote);

module.exports = router;