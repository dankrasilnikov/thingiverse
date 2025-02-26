import sharp from 'sharp';
import fs from 'fs';

async function convertToWebp(inputBuffer, quality = 80) {
    return sharp(inputBuffer)
        .toFormat('webp', {quality})
        .toBuffer();
}

async function convertToWebpPreview(inputBuffer, quality = 60, width = 300) {
    return sharp(inputBuffer)
        .resize({ width, withoutEnlargement: true })
        .toFormat('webp', { quality })
        .toBuffer();
}

async function generateBlurDataUrl(inputBuffer, width = 20, blur = 10) {
    const outputBuffer = await sharp(inputBuffer)
        .resize({ width, withoutEnlargement: true })
        .blur(blur)
        .jpeg({ quality: 50 })
        .toBuffer();

    const base64 = outputBuffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
}

export async function processImage(imageBuffer, originalName) {

    const webpBufferFull = await convertToWebp(imageBuffer, 80);
    const webpKeyFull = `images/${Date.now()}-full-${originalName}.webp`;

    const webpBufferPreview = await convertToWebpPreview(imageBuffer, 60, 300);
    const webpKeyPreview = `images/${Date.now()}-preview-${originalName}.webp`;

    const blurDataUrl = await generateBlurDataUrl(imageBuffer, 20, 10);

    return {
        webpFull: {
            key: webpKeyFull,
            buffer: webpBufferFull,
            contentType: 'image/webp'
        },
        webpPreview: {
            key: webpKeyPreview,
            buffer: webpBufferPreview,
            contentType: 'image/webp'
        },
        blurDataUrl
    };
}
