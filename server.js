import express from 'express';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import { userRouter } from './routers/users.router.js';
import { mainErrorHandler, noRouteHandler } from './middlewares/error.handler.js';
import { todoRouter } from './routers/todos.router.js';



let app = express();


const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();

db.data ||= { users: [], todos:[] };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.use(noRouteHandler)
app.use(mainErrorHandler)
const port = 5000;
app.listen(port, console.log(`server is up on port: ${port}. 👻`))
