// Imports 
import express from "express"
import db from './db/db'
import bodyParser from 'body-parser'

// Init of express
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is mandatory'
        })
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is mandatory'
        })

    }

    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    }

    db.push(todo);
    // STATUS CODE 201 => Created
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfuly'
    })






})

// localhost:80/api/todos/1
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    console.log(id)


    for (let i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'todo retrived',
                todo: db[i]
            })
        }
    }
    // db.forEach(todo => {
    //     if (todo.id === id) {
    //         return res.status(200).send({
    //             success: 'true',
    //             message: 'todo retrived',
    //             todo: todo
    //         })
    //     }
    // })

    return res.status(404).send({
        success: 'false',
        message: 'todo does not exist'
    })
})


app.get('/api/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos recived successfully',
        todos: db
    })
});

const PORT = 80;


app.listen(PORT, () => {
    console.log("Server is running on 80")
})