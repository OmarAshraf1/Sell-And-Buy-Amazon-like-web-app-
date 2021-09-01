const app = require('./backend/app')(app);

app.get('/test', (req, res) => res.send('Hello '));