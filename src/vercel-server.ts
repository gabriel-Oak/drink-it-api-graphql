import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import createServer from './server';
import context from './utils/middlewares/context';

const port = process.env.port || 3000;
const app = express();

app.get('/ping', async (_req: Request, res: Response) => {
  res.json('pong 🏓');
});

app.listen(port);
app.use(cors());
app.use(json());
app.use('/graphql', async (req: Request, res: Response, next: NextFunction) => {
  const server = await createServer();
  await server.start();
  return expressMiddleware(server, { context })(req, res, next);
});

export default app;
