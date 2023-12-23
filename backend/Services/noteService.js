
const Note = require('../Models/Note');
require('dotenv').config();
const { Op } = require('sequelize');
const moment = require('moment-timezone');

module.exports =  class NoteService {


   //obtener todas las notas
   async getNotes(){

        try {
            const allNotes = await Note.findAll();
            return allNotes
        }catch(e){
            return e
        }

    }

       //crear nota
   async createNote(data){
        try {
            // const formattedDate = moment.tz(data.date, data.timezone).format();
        
            var newNote = {}
            newNote.title = data.title
            newNote.content = data.content
            newNote.date = data.date

            newNote = await Note.create(newNote)

            return newNote
        }catch(e){
            return e
        }

    }

    //actualizar nota
   async updateNote(data){
        try {

            var noteResource = null
            var noteUpdate = null

            if(data.id){
                noteResource = await Note.findOne({ where: { id: data.id } })
            }
            
            if(noteResource){
                var note = {}
                note.title = data.title
                note.content = data.content
                note.date = data.date
        
                noteUpdate = await Note.update(note, { where: { id: data.id }})    
            }

            return {noteResource, noteUpdate}
        }catch(e){
            return e
        }

    }

        //buscar nota
   async searchNote(searchQuery){
    try {


        var results = null

        if(searchQuery){
            results = await Note.findAll({
                where: {
                  [Op.or]: [
                    { title: { [Op.like]: `%${searchQuery}%` } },
                    { content: { [Op.like]: `%${searchQuery}%` } }
                  ]
                }
              });
        }
    

        return {results}
    }catch(e){
        return e
    }

    }

}


