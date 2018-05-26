-- Database should be prime_feedback
CREATE DATABASE "prime_feedback";

-- Switch to "prime_feedback" before making:
-- Table to store the feedback
CREATE TABLE "feedback" (
    "id" SERIAL PRIMARY KEY,
    "feeling" INT NOT NULL,
    "understanding" INT NOT NULL,
    "support" INT NOT NULL,
    "comments" TEXT,
    "flagged" BOOLEAN DEFAULT FALSE,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Sample feedback item
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (4, 4, 5, 'Doing Great!');