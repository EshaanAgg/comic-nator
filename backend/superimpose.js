const sharp = require('sharp');

async function superimposeImages(baseImagePath, overlayImagePath) {
    try {
        await sharp(baseImagePath)
            .composite([{ input: overlayImagePath }])
            .toFile('output.png');
        console.log('Image superimposition completed.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Example usage
// superimposeImages('polaroid.png', 'text.png');

module.exports = superimposeImages;