import express from 'express';
import { Client } from '@elastic/elasticsearch';

const router = express.Router();
const esClient = new Client({ node: 'http://46.202.129.157:9200' });

router.get('/', async (req, res) => {
    const query = req.query.q ? String(req.query.q) : '';

    try {
        const result = await esClient.search({
            index: 'things',
            size: 5,
            _source: ['id', 'images', 'title', 'author'],
            query: {
                multi_match: {
                    query,
                    fields: ['title^2', 'description'],
                    fuzziness: 'AUTO'
                }
            },
            sort: [{ createdAt: { order: 'desc' } }]
        });

        const total = typeof result.hits.total === 'number'
            ? result.hits.total
            : result.hits.total.value;

        const hits = result.hits.hits.map(hit => hit._source);
        res.json({ total, results: hits });
    } catch (error) {
        console.error('Error in search endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
