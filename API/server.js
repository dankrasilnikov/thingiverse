import 'dotenv/config';
import express from 'express';
import convertRoutes from './routes/convert.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

// app.use('/api/v1/models', thingsRoutes);
// app.use('/api/v1/model', modelRoutes);
// app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/convert', convertRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
