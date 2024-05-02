# Proju

The aim of the project was to create a web application that allows the user to summarize an article of text and automatically create a hit tweet or group chat message from it. The llama 3 8b seemed to struggle a bit with longer context lengths resulting in partly quite nonsensical outputs.

The model as well as the project were both deployed to google cloud. The database is hosted through Supabase.

## To run locally

`cd client && npm install && npm run dev`

`cd server && npm install && npm run dev`

## Main Stack

- PostgreSQL
- Node + Express
- React

### Also
- tailwind + shadcn/ui
- react-hook-form + zod
- swr
- typescript
