import { connection } from "../db/database.js";
import { urlSchema } from "../models/urlSchema.js"
import { validateBySchema } from "../services/validateBySchema.js"

export async function validateUrl(req,res,next) {
    if (!validateBySchema(req.body, res, urlSchema)) return;

    next()
}