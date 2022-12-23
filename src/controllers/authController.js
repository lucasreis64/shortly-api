import { connection } from "../db/database.js";
import bcrypt from "bcrypt";

export async function create(req, res) {
    const { name, email, password } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, passwordHash]
        );

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {}
