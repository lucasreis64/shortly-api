import cors from "cors";
import express, { json } from "express";
import dotenv from 'dotenv'
import authRouter from './routers/authRouter.js';
import urlRouter from './routers/urlRouter.js';
import usersRouter from './routers/usersRouter.js';
import rankingRouter from './routers/rankingRouter.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(urlRouter);
app.use(usersRouter);
app.use(rankingRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Running on port " + process.env.PORT)
})