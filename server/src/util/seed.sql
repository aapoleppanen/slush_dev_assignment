CREATE DATABASE database;

\c database;

CREATE TABLE summary (
    id SERIAL PRIMARY KEY,
    text TEXT,
    audience TEXT,
    purpose TEXT,
    result TEXT,
    revisionNumber INTEGER,
    parent INTEGER REFERENCES summary (id) ON DELETE CASCADE
);

INSERT INTO summary (text, audience, purpose, result, revisionNumber, parent) VALUES
('Sample input', 'twitter', 'sell', 'Example output 1', 0, NULL),
('Another sample text', 'group_chat', 'inform', 'Example output 2', 0, NULL);

BEGIN;

WITH parent AS (
  INSERT INTO summary (text, purpose, result, revisionNumber, parent) VALUES
  ('Sample input', 'twitter', 'sell', 'Example output 3', 0, NULL)
  RETURNING id
)

INSERT INTO summary (text, purpose, result, revisionNumber, parent) VALUES
('Sample input', 'twitter', 'sell', 'Example output 3 revision 1', 0, (SELECT id FROM parent));

COMMIT;
