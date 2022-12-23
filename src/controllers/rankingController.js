import { connection } from "../db/database.js";

export async function rank(req, res) {
    let { user } = res.locals;

    try {
        let ranking = await connection.query(
            `
            SELECT u.id, u.name, COUNT(l."userId") AS "linksCount", 
            SUM(COALESCE(l."visitCount", 0)) AS "visitCount" 
            FROM users u 
            LEFT JOIN links l ON u.id = l."userId" 
            GROUP BY u.id, u.name 
            ORDER BY "visitCount" DESC NULLS LAST LIMIT 10
        `
        );

        res.send(ranking.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
