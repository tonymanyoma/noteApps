
const noteService = require('../Services/noteService')

var controller = {

    getNotes: async (req, res) => {

        var note = new noteService();

        try {
            var result = await note.getNotes()
            if(result){
                res.status(200).send({
                    message: 'Notas consultadas',
                    data: result
                });
            }

        } catch (error) {
            res.status(422).send({
                message: 'Error al consultar las notas'
            });
        }


    },


    createNote: async (req, res) => {

        const data = req.body;

        var note = new noteService();

        try {
            var result = await note.createNote(data)
            if(result){
                res.status(200).send({
                    message: 'Nota creada con éxito',
                    data: result
                });
            }

        } catch (error) {
            res.status(422).send({
                message: 'Error al crear la nota'
            });
        }

    },


    updateNote: async (req, res) => {

        const data = req.body;

        var note = new noteService();

        try {
            var result = await note.updateNote(data)

            if(result.noteResource != null){
                res.status(200).send({
                    message: 'Nota actualizada con éxito'
                });
            }else{
                res.status(422).send({
                    message: 'Nota no encontrada'
                });
            }

        } catch (error) {
            res.status(422).send({
                message: 'Error al actualizar la nota'
            });
        }

    },

    searchNote: async (req, res) => {

        const searchQuery = req.body.search_query;

        var note = new noteService();

        try {
            var result = await note.searchNote(searchQuery)

            if(result != null){
                res.status(200).send({
                    message: 'Nota encontrada con éxito',
                    data: result
                });
            }else{
                res.status(422).send({
                    message: 'Nota no encontrada'
                });
            }

        } catch (error) {
            res.status(422).send({
                message: 'Error al buscar la nota'
            });
        }

    },

}


module.exports = controller;