import { request, response } from 'express';
import { db } from '../config/db.js'

export const addNote = (request, response) => {
    const note_data = request.body
    const created_at = new Date().toJSON().slice(0, 10).toString()
    const q = "INSERT INTO notes(title, note_content, author, notebook_id, created_at) VALUES(?,?,?,?,?)";

    db.query(q, 
        [note_data[0].noteTitle, 
        note_data[0].noteEditorContent, 
        note_data[0].author,
        note_data[0].notebookId, 
        created_at],  
        (err, result) => {
        if(err) { 
            console.log(err)
            response.send({'error': err.message})
        } else {
            response.send({'success':'Successfully added new note!'})
        }     
    })
};

export const getNotes = (request, response) => {
    const { userId } = request.params;
    
    const q = `SELECT nts.id, 
    nts.title as 'note_title',
    nts.note_content as 'note_content', 
    nts.is_favourite as 'is_favourite',
    nts.author as 'author',
    ntbks.title as 'notebook_title'
    FROM e_notes_db.notes AS nts
    JOIN e_notes_db.notebooks as ntbks
    ON nts.notebook_id = ntbks.id AND author = ?
    ORDER by nts.id DESC`;

    db.query(q, userId, (err, result) => {
        response.send(result);
    })
};

export const getNote = (request, response) => {
    const { id } = request.params;

    const q = `SELECT nts.id, 
    nts.title as 'note_title',
    nts.note_content as 'note_content', 
    nts.is_favourite as 'is_favourite',
    nts.author as 'author',
    ntbks.title as 'notebook_title'
    FROM e_notes_db.notes AS nts
    JOIN e_notes_db.notebooks as ntbks
    ON nts.notebook_id = ntbks.id AND nts.id = ? `

    db.query(q, id, (err, result )=> {
        response.send(result)
    });
};

export const addNoteToFavourites = (request, response) => {
    const { id } = request.params;
    const q = `SELECT nts.id, 
    nts.title as 'note_title',
    nts.note_content as 'note_content', 
    nts.is_favourite as 'is_favourite',
    nts.author as 'author',
    ntbks.title as 'notebook_title'
    FROM e_notes_db.notes AS nts
    JOIN e_notes_db.notebooks as ntbks
    ON nts.notebook_id = ntbks.id
    ORDER by nts.id DESC`;

    db.query(q, id, (err, result) => {
        if(result[0].is_favourite === 1) {
            const sqlUpdateForZero = "UPDATE notes SET is_favourite = 0 WHERE id = ?"
            db.query(sqlUpdateForZero, id, (err, result) => {
                response.send(result) 
            })
         } else {
            const sqlUpdateForOne = "UPDATE notes SET is_favourite = 1 WHERE id = ?"
            db.query(sqlUpdateForOne, id, (err, result) => {
                response.send(result) 
            })
         }
    })
};

export const deleteNote = (request, response) => {
    const { id } = request.params;
    const q = "DELETE FROM notes WHERE id = ?";

    db.query(q, id, (err, result) => {
        response.send(result);
    })
};

export const editNote = (request, response) => {
    const note_data = request.body;
    const last_modified = new Date().toJSON().slice(0, 10).toString();

    const q = "UPDATE notes SET title = ?, note_content = ?, notebook_id = ?, last_modified = ? WHERE id = ?";
    db.query(q, [note_data[0].noteTitle, note_data[0].noteEditorContent, note_data[0].notebookId,last_modified, note_data[0].note_id], (err, result) => {
        response.send(result);
    })
};