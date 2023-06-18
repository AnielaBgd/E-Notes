import { db } from '../config/db.js'

export const addProject = (request, response) => {
    const project_data = request.body
    const created_at = new Date().toJSON().slice(0, 10).toString()
    const q = "INSERT INTO projects(title, description, status, created_at, userId) VALUES(?,?,?,?,?)";
    db.query(q,
        [project_data[0].title,
        project_data[0].description,
        project_data[0].status,
        created_at,
        project_data[0].userId],
        (err, result) => {
            if (err) {
                response.send({'error': err.message})
            } else {
                response.send ({'success':'Successfully created a new project!'})
            }
        })
};

export const getProjects = (request, response) => {
    const { id } = request.params;
    // console.log(request.params)
    const q = "SELECT * FROM projects WHERE userId = (?) ORDER BY id DESC";
    db.query(q, id, (err, result) => {
        response.send(result)
    })
}

export const getFavouriteProjects = (request, response) => {
    const { id } = request.params;
    // console.log(request.params)
    const q = "SELECT * FROM projects WHERE userId = (?) AND is_favourite = 1 ORDER BY id DESC";
    db.query(q, id, (err, result) => {
        response.send(result)
    })
}

export const getProject = (request, response) => {
    const { id } =  request.params;
    const q = "SELECT * FROM projects WHERE id = ?";
    db.query(q, id, (err, result )=> {
        response.send(result)
        // console.log(response)
    });
};

export const editProject = (request, response) => {
    const project_data = request.body
    // const updated_at = new Date().toJSON().slice(0, 10).toString()

    const q = "UPDATE projects SET title=?, description=?, status=? WHERE id =?";
    db.query(q, 
        [project_data[0].title,
        project_data[0].description,
        project_data[0].projectStatus,
        project_data[0].id],  
        (err, result) => {
        if(err) {
            response.send({'error': err.message})
        } else {
            response.send({'success':'Successfully edited the project!'})
        }     
    })
};

export const deleteProject = (request, response) => {
    const { id } =  request.params
    const q = "DELETE FROM projects WHERE id = ?"
    db.query(q, id, (err, result) => {
        response.send(result)
    })
};

export const addProjectToFavourite = (request, response) => {
    const { id } =  request.params
    const q = "SELECT * FROM projects WHERE id = ?" 
 
    db.query(q, id, (err, result) => {
         if(result[0].is_favourite === 1) {
            const sqlUpdateForZero = "UPDATE projects SET is_favourite = 0 WHERE id = ?"
            db.query(sqlUpdateForZero, id, (err, result) => {
                response.send(result) 
            })
         } else {
            const sqlUpdateForOne = "UPDATE projects SET is_favourite = 1 WHERE id = ?"
            db.query(sqlUpdateForOne, id, (err, result) => {
                response.send(result) 
            })
         }
    })
};