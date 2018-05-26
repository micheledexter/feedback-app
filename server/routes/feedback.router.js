const express = require('express');
const router = express.Router();
const pool = require('../modules/database.connection');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "feedback"`).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log(`ERROR trying to GET /api/feedback: ${error}`);
        res.sendStatus(500);
    });
});

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

router.put('/:id', (req, res) => {
    const feedbackId = req.params.id;
    const flagged = req.body.flagged;
    pool.query(`UPDATE "feedback" SET "flagged" = $1 WHERE "id" = $2;`, [
        flagged, feedbackId
    ]).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`ERROR trying to PUT /api/feedback/:id: ${error}`);
        res.sendStatus(500);
    });
})

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