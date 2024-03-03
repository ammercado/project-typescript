import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
 res.status(200).json("hello :), I am an Express.js TypeScript App, running on Google Kubernetes Engine (GKE) cluster.");
});

app.listen(4000, () => {
 console.log(`App is listening on port 4000`);
});