import express from "express";
import {Client} from '@elastic/elasticsearch';
import {uploadToR2} from "../services/uploadToR2.js";
import {processImage} from "../services/imageConvert.js";
import multer from "multer";

const router = express.Router();
const esClient = new Client({node: 'http://46.202.129.157:9200'});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});

const multipleUpload = upload.fields([
    {name: 'stls', maxCount: 10},
    {name: 'images', maxCount: 10},
]);

router.post('/', multipleUpload, async (req, res) => {
    try {
        const {author, description, title, tags} = req.body;

        let tagsArr = [];
        if (tags) {
            try {
                tagsArr = JSON.parse(tags);
            } catch {
                tagsArr = tags.split(',').map(t => t.trim());
            }
        }

        const stlFiles = req.files['stls'] || [];
        const imageFiles = req.files['images'] || [];

        const imagesResult = [];
        const filesResult = [];

        for (let i = 0; i < stlFiles.length; i++) {
            const stlFile = stlFiles[i];

            const originalName = stlFile.originalname;
            const stlBuffer = stlFile.buffer;

            const date = Date.now();

            const stlKey = `stls/${date}-${originalName}`;
            const stlUrl = await uploadToR2(stlKey, stlBuffer, 'application/sla');

            filesResult.push(stlUrl);
        }

        for (const file of imageFiles) {
            const originalName = file.originalname;
            const imgBuffer = file.buffer;

            const {webpFullUrl, webpPreviewUrl, blurDataUrl} = processImage(imgBuffer, originalName)

            imagesResult.push({
                imgUrl: webpFullUrl,
                previewUrl: webpPreviewUrl,
                dataUrl: blurDataUrl,
            });
        }

        const doc = {
            author,
            description,
            title,
            tags: tagsArr,
            createdAt: new Date().toISOString(),
            files: filesResult,
            images: imagesResult
        };

        const result = await esClient.index({
            index: 'things',
            body: doc,
            refresh: true
        });

        res.status(200).json({
            message: 'Successfully uploaded and processed',
            docId: result._id,
            doc
        });
    } catch (error) {
        console.error('Error in POST /things:', error);
        res.status(500).json({error: error.message});
    }
});

export default router;
