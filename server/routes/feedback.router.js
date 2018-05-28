const express = require('express');
const router = express.Router();
const pool = require('../modules/database.connection');

// Simple GET request which returns all of the database entries
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "feedback"`).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log(`ERROR trying to GET /api/feedback: ${error}`);
        res.sendStatus(500);
    });
});

// POST a new entry into the database
// Relying on defaults for some fields. We don't want users touching these
router.post('/', (req, res) => {
    const entry = req.body;
    pool.query(`INSERT INTO "feedback" ("feeling", "understanding", "support", "comments") VALUES ($1, $2, $3, $4);`, [
        entry.feeling,
        entry.understanding,
        entry.support,
        entry.comments
    ]).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`ERROR trying to POST /api/feedback: ${error}`);
        res.sendStatus(500);
    });
});

// Set the flagged status of an entry with PUT
// Use their ID to find the entry, and then set the "flagged" field
router.put('/:id', (req, res) => {
    const feedbackId = req.params.id;
    const setFlag = req.body.setStatus;
    pool.query(`UPDATE "feedback" SET "flagged" = $1 WHERE "id" = $2;`, [
        setFlag, feedbackId
    ]).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`ERROR trying to PUT /api/feedback/:id: ${error}`);
        res.sendStatus(500);
    });
})

// Find and DELETE an entry
router.delete('/:id', (req, res) => {
    const target = req.params.id;
    pool.query(`DELETE FROM "feedback" WHERE "id" = $1`, [target]).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`ERROR trying to DELETE /api/feedback/:id: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;