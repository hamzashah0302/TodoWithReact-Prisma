import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
const Router = require('./routes/todo.route')
var cors = require('cors');
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/',Router)

const server = app.listen(3001, () =>
    console.log(`
🚀 Server ready at: http://localhost:3001`)
);
