import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || "yes_no_maybe",
  API_ENDPOINT: process.env.API_ENDPOINT || "",
  PROJECT_ID: process.env.PROJECT_ID || "",
  ENDPOINT_ID: process.env.ENDPOINT_ID || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
}
