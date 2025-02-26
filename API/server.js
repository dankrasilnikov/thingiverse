// server.js
const express = require('express');
const bodyParser = require('body-parser');

// Подключаем маршруты из папки routes
const thingsRoutes = require('./routes/things');
const modelRoutes = require('./routes/model');
const searchRoutes = require('./routes/search');
const convertRoutes = require('./routes/convert');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use('/api/v1/models', thingsRoutes);
app.use('/api/v1/model', modelRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/convert', convertRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
