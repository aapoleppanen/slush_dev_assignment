import express, { Express } from "express";
import summaryRouter from "./routes/summary";
import { unknownEndpoint } from "./util/middleware";
import cors from "cors";
import { env } from "./util/env";

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use("/api/summary", summaryRouter);

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
