import { Router } from "express";
import * as db from "../util/db";
import { CreateSummaryParams, Summary } from "../types";
import { getSummary } from "../services/summary";

const summaryRouter = Router();

summaryRouter.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await db.query(
      "SELECT * FROM summary ORDER BY id DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.json(result.rows);
  } catch (e) {
    next(e);
  }
});

summaryRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM summary WHERE id = $1", [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Summary not found");
    }
  } catch (e) {
    next(e);
  }
});

summaryRouter.post("/", async (req, res, next) => {
  try {
    const params = req.body as CreateSummaryParams;

    const { result } = await getSummary(params);

    const newEntry = await db.query(
      "INSERT INTO summary (text, audience, purpose, result, revisionNumber, parent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [params.text, params.audience, params.purpose, result, 0, null]
    );
    res.status(201).json(newEntry.rows[0]);
  } catch (e) {
    next(e);
  }
});

summaryRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, audience, purpose, result, revisionNumber, parent } =
      req.body as Summary;
    const updatedEntry = await db.query(
      "UPDATE summary SET text = $1, audience = $2, purpose = $3, result = $4, revisionNumber = $5, parent = $6 WHERE id = $7 RETURNING *",
      [text, audience, purpose, result, revisionNumber, parent, id]
    );
    if (updatedEntry.rows.length) {
      res.json(updatedEntry.rows[0]);
    } else {
      res.status(404).send("Summary not found");
    }
  } catch (e) {
    next(e);
  }
});

summaryRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await db.query(
      "DELETE FROM summary WHERE id = $1 RETURNING *",
      [id]
    );
    if (deleted.rows.length) {
      res.json(deleted.rows[0]);
    } else {
      res.status(404).send("Summary not found");
    }
  } catch (e) {
    next(e);
  }
});

export default summaryRouter;
