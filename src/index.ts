import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const app = express();
const client = new PrismaClient();


app.post("/user", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hasedPassword = bcrypt.hash(password, 16);

    client.user.create({
        data: {
            username,
            password: hashedPassword
        }
    })
})
app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json({
        users
    })
})

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;

    const user = await client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username: true,
            password: true,
        }
    });
    res.json({
        user
    })
})

app.listen(3000);

async function getUser() {
    const user = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    })

    console.log(user)
}

getUser();
