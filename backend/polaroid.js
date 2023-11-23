const sharp = require('sharp');

async function createPolaroid(inputImagePath, outputImagePath) {
  try {
    const image = sharp(inputImagePath);
    const metadata = await image.metadata();

    const canvasWidth = metadata.width + 16;
    const canvasHeight = metadata.height + 104;

    const canvas = sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    });

    const leftMargin = 8;
    const topMargin = 8;

    const overlayPosition = {
      left: leftMargin,
      top: topMargin,
    };

    await canvas.composite([
      {
        input: inputImagePath,
        gravity: 'northwest',
        left: overlayPosition.left,
        top: overlayPosition.top,
      },
    ]);

    await canvas.toFile(outputImagePath);

    console.log('Polaroid effect applied successfully.');
  } catch (error) {
    console.error('Error applying polaroid effect:', error);
  }
}

// Example usage
// const inputImagePath = 'image.png';
// const outputImagePath = 'polaroid.png';

// createPolaroid(inputImagePath, outputImagePath);

module.exports = createPolaroid;
