const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const feedback = require('./routes/feedback.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/feedback', feedback);

/** ---------- START SERVER ---------- **/
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});