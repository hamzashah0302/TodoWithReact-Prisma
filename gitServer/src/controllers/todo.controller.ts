const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const auth = require('./middleware/auth')
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// // add todo
async function AddTodo(req: any, res: any) {
    const { name, day, email } = req.body;
    const result = await prisma.todos.create({
        data: {
            name,
            day,
            author: { connect: { email: email } },
        },
    });
    res.json(result);
}

// get user todos 
async function TodoList(req: any, res: any) {
    const { id } = req.params;

    try {
        const postsData = await prisma.todos.findMany({
            where: { authorId: Number(id) }
        });
        res.json(postsData);
    } catch (error) {
        res.json({ error });
    }
}

async function DeleteTodo(req: any, res: any) {
    const { id } = req.body;
    try {
        const post = await prisma.todos.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({ status: "success" });
    } catch (error) {
        res.status(404).json({ error });
    }
}

async function EditTodo(req: any, res: any) {
    const { id, day, name } = req.body;
    try {
        const post = await prisma.todos.update({
            where: {
                id: Number(id),
            },
            data: {
                day, name
            },
        });
        res.json({ status: "success" });
    } catch (error) {
        res.status(404).json({ error });
    }
}

module.exports = {
    AddTodo, TodoList, DeleteTodo, EditTodo
};