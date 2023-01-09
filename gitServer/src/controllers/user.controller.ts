const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// login
async function Login(req: any, res: any) {
    const { email, posts, password } = req.body;
    const user: any = await prisma.user.findFirst({
        where: {
            email
        },
    });
    if (!user) return res.status(200).send({ error: 'User Not Found' })
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "365d",
            }
        );
        // save user token
        delete user.password
        user.token = token;
        res.json(user)
    }
    else {
        res.status(200).send({ error: 'invalid cradentials' })
    }
};

// Signup
async function Signup(req: any, res: any) {
    const { user_name, email, password } = req.body;
    try {
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        const result: any = await prisma.user.create({
            data: {
                name: user_name,
                email,
                password: encryptedPassword,
            },
        });
        const token = jwt.sign(
            { user_id: result.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "365d",
            }
        );
        // save user token
        delete result.password
        result.token = token;
        res.json(result);
    } catch (error) {
        res.json({ error: 'Try with diffrent email!' });
    }

}

module.exports = {
    Login, Signup
};
