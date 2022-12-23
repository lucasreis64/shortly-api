import { connection } from "../db/database.js";

export async function findMe(req, res) {
    let { user } = res.locals;

    try {
        let short = await connection.query(
            `SELECT u.id, u.name, SUM(l."visitCount") AS "visitCount"
            FROM links l
            JOIN users u ON l."userId"=u.id
            WHERE "userId" = $1
            GROUP BY u.id`,
            [user.id]
        );

        let shortenedUrls = await connection.query(
            'SELECT id, "shortUrl", url, "visitCount" FROM links'
        );

        short.rows[0].shortenedUrls = shortenedUrls.rows

        console.log(short.rows[0])

        res.send(short.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
