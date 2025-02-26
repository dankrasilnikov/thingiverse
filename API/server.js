import 'dotenv/config';
import express from 'express';
import things from './routes/things.js';
import search from './routes/search.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

// app.use('/api/v1/models', thingsRoutes);
// app.use('/api/v1/model', modelRoutes);
app.use('/api/v1/search', search);
app.use('/api/v1/things', things);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
