import { RequestHandler } from "express";

export const unknownEndpoint: RequestHandler = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
