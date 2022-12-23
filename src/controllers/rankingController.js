import { connection } from "../db/database.js";

export async function rank(req, res) {
    let { user } = res.locals;

    try {
        let short = await connection.query(
            `SELECT u.id, u.name, COUNT(l."shortUrl") AS linksCount, SUM(l."visitCount") AS "visitCount"
            FROM users u
            JOIN links l ON l."userId"=u.id
            GROUP BY u.id
            ORDER BY "visitCount" ASC`
        );

        console.log(short.rows)

        res.send(short.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}