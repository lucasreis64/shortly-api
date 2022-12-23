import { connection } from "../db/database.js";
import { nanoid } from "nanoid";

export async function create(req, res) {
    let { user } = res.locals;
    let { url } = req.body;
    const urlId = nanoid(8);

    try {
        await connection.query(
            'INSERT INTO links ("userId", url, "shortUrl") VALUES ($1, $2, $3);',
            [user.id, url, urlId]
        );

        res.status(201).send({ shortUrl: urlId });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function findOne(req, res) {
    let { id } = req.params;

    try {
        let short = await connection.query(
            "SELECT * FROM links WHERE id = $1",
            [id]
        );

        if (short.rows.length === 0) return res.sendStatus(404);

        short = short.rows[0];
        delete short.createdAt;
        delete short.visitCount;
        delete short.userId;

        res.send(short);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function redirect(req, res) {
    let { shortUrl } = req.params;

    try {
        let short = await connection.query(
            'SELECT * FROM links WHERE "shortUrl" = $1',
            [shortUrl]
        );

        short = short.rows[0];

        if (!short) res.sendStatus(404);

        await connection.query(
            'UPDATE links SET "visitCount"=$1 WHERE "shortUrl" = $2',
            [short.visitCount + 1, shortUrl]
        );
        res.redirect(short.url);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function deleteOne(req, res) {
    let { id } = req.params;
    let { user } = res.locals;
    try {
        let short = await connection.query(
            "SELECT * FROM links WHERE id = $1",
            [id]
        );

        if (short.rows.length === 0) {
            res.sendStatus(404);
            return;
        }

        if (short.rows[0]?.id !== user.id) return res.sendStatus(401);

        await connection.query("DELETE FROM links WHERE id = $1", [id]);

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
