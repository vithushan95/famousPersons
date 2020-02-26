const express = require('express');
const cors = require('cors');
const route = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/api', route);
app.get('/form', (req, res) => {
    res.render('pages/form')
})
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message
    });
})
app.listen(3000);

module.exports = app;