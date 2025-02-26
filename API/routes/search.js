import express from 'express';
import {Client} from '@elastic/elasticsearch';

const router = express.Router();
const esClient = new Client({node: process.env.ELASTICSEARCH_URL});

router.get('/', async (req, res) => {
    const query = req.query.q ? String(req.query.q) : '';
    const page = parseInt(String(req.query.page)) || 1;
    const size = parseInt(String(req.query.size)) || 20;
    const from = (page - 1) * size;

    try {
        const result = await esClient.search({
            index: 'things',
            from,
            size,
            _source: ['id', 'images', 'title', 'author'],
            query: {
                multi_match: {
                    query,
                    fields: ['title^2', 'description'],
                    fuzziness: 'AUTO'
                }
            },
            sort: [{createdAt: {order: 'desc'}}]
        });

        const total = typeof result.hits.total === 'number'
            ? result.hits.total
            : result.hits.total.value;

        const hits = result.hits.hits.map(hit => hit._source);
        res.json({total, results: hits});
    } catch (error) {
        console.error('Error in search endpoint:', error);
        res.status(500).json({error: error.message});
    }
});

export default router;
