const express = require('express');
const app = express();
const apiRoutes = require('./route/api');
const webRoutes = require('./route/web');

app.use(express.json());


app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server started on port Http://127.0.0.1:3000');
});