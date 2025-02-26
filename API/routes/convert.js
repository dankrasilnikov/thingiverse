const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { stlUrl } = req.body;

    res.json({ message: 'STL conversion not implemented yet', stlUrl });
});

module.exports = router;
