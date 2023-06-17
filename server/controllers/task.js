import { db } from '../config/db.js'

export const addTask = (request, response) => {
    const task_data = request.body
    const q = "INSERT INTO tasks( name, member, status, projectId) VALUES(?,?,?,?)";
    db.query(q,
        [task_data[0].name,
        task_data[0].member,
        task_data[0].status,
        task_data[0].projectId],
        (err, result) => {
            if (err) {
                response.send({'error': err.message})
            } else {
                response.send ({'success':'Successfully created a new task!'})
            }
        })
}

export const getTasks = (request, response) => {
    const { id } = request.params;
    console.log(request.params)
    // console.log(request.params)
    const q = "SELECT * FROM tasks WHERE projectId = (?) ORDER BY id DESC";
    db.query(q, id, (err, result) => {
        // console.log(result)
        // console.log(response)
        response.send(result)
    })
}

export const getTask = (request, response) => {
    const { id } = request.params;
    console.log(request.params)
    // console.log(request.params)
    const q = "SELECT * FROM tasks WHERE id = ?";
    db.query(q, id, (err, result) => {
        // console.log(result)
        // console.log(response)
        response.send(result)
    })
}

export const editTask = (request, response) => {
    const task_data = request.body
    const q = "UPDATE tasks SET name = ?, member = ?, status = ? WHERE id = ?";
    db.query(q,
        [task_data[0].name,
        task_data[0].member,
        task_data[0].status,
        task_data[0].id],
        (err, result) => {
            if (err) {
                response.send({'error': err.message})
            } else {
                response.send ({'success':'Successfully created a new task!'})
            }
        })
}

export const deleteTask = (request, response) => {
    const { id } =  request.params
    const q = "DELETE FROM tasks WHERE id = ?"
    db.query(q, id, (err, result) => {
        response.send(result)
    })
};


