const createPolaroid = require("./polaroid");
const textToImage = require("./text");
const superimposeImages = require("./superimpose");

const fs = require('fs').promises;
const { createCanvas } = require('canvas');
const sharp = require('sharp');

const text = "Another day of life-saving for our superhero. Not a day goes by without him saving the city.";
const maxWidth = 512;
const imageBuffer = textToImage(text, maxWidth);

async function processImages() {
    try {
        await fs.writeFile('text.png', imageBuffer);

        const inputImagePath = 'image.png';
        const outputImagePath = 'polaroid.png';
        await createPolaroid(inputImagePath, outputImagePath);

        await superimposeImages('polaroid.png', 'text.png');
        console.log('All operations completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

processImages();