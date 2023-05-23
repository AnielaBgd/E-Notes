import { db } from "../config/db.js";

export const getNotebooks = (request, response) => {
    const { userId } = request.params;
    const q = "SELECT * FROM notebooks WHERE created_by = (?) ORDER BY id DESC";
    db.query(q, userId, (err, result )=> {
        response.send(result)
    });
};


export const getNotebook = (request, response) => {
    const { id } =  request.params;
    const q = "SELECT * FROM notebooks WHERE id = ?";
    db.query(q, id, (err, result )=> {
        response.send(result)
    });
};

export const createNotebook = (request, response) => {
    const notebook_data = request.body
    const created_at = new Date().toJSON().slice(0, 10).toString()
   
    const q = "INSERT INTO notebooks(title, created_by, created_at) VALUES(?,?,?)"
    db.query(q, 
        [notebook_data[0].title, notebook_data[0].author, created_at],  
        (err, result) => {
        if(err) {
            response.send({'error': err.message})
        } else {
            response.send({'success':'Successfully added new notebook!'})
        }     
    })
};

export const editNotebook = (request, response) => {
    const notebook_data = request.body
    const updated_at = new Date().toJSON().slice(0, 10).toString()

    const q = "UPDATE notebooks SET title = ?, updated_at = ? WHERE id = ?"
    db.query(q, 
        [notebook_data[0].title, updated_at, notebook_data[0].notebook_id],  
        (err, result) => {
        if(err) {
            response.send({'error': err.message})
        } else {
            response.send({'success':'Successfully edit new notebook!'})
        }     
    })
};

export const deleteNotebook = (request, response) => {
    const { id } =  request.params
    const q = "DELETE FROM notebooks WHERE id = ?"
    db.query(q, id, (err, result) => {
        response.send(result)
    })
};

export const addNotebookToFavourite = (request, response) => {
    const { id } =  request.params
    const q = "SELECT * FROM notebooks WHERE id = ?" 
 
    db.query(q, id, (err, result) => {
         if(result[0].is_favourite === 1) {
            const sqlUpdateForZero = "UPDATE notebooks SET is_favourite = 0 WHERE id = ?"
            db.query(sqlUpdateForZero, id, (err, result) => {
                response.send(result) 
            })
         } else {
            const sqlUpdateForOne = "UPDATE notebooks SET is_favourite = 1 WHERE id = ?"
            db.query(sqlUpdateForOne, id, (err, result) => {
                response.send(result) 
            })
         }
    })
};