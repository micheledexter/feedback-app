const express = require('express');
const router = express.Router();
const pool = require('../modules/database.connection');

router.get('/', (req, res) => {
    console.log('GET /api/feedback');
});

router.post('/', (req, res) => {
    console.log('POST /api/feedback')
});

router.put('/:id', (req, res) => {
    console.log('PUT /api/feedback/:id');
});

router.delete('/:id', (req, res) => {
    console.log('DELETE /api/feedback/:id');
});

module.exports = router;