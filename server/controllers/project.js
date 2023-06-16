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

export const getProject = (request, response) => {
    const { id } =  request.params;
    const q = "SELECT * FROM projects WHERE id = ?";
    db.query(q, id, (err, result )=> {
        console.log(result)
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
        project_data[0].status,
        project_data[0].id],  
        (err, result) => {
        if(err) {
            console.log(err)
            response.send({'error': err.message})
        } else {
            response.send({'success':'Successfully edited the project!'})
        }     
    })
};