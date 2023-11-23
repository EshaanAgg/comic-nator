import sharp from 'sharp';

const leftMargin = 8;
const topMargin = 8;

// Converts an image to polaroid by adding whitespace to add text
export const createPolaroid = async (inputImage: Buffer) => {
  const image = sharp(inputImage);

  const metadata = await image.metadata();
  const canvasWidth = (metadata.width || 0) + 16;
  const canvasHeight = (metadata.height || 0) + 104;

  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 1
      }
    }
  });

  const overlayPosition = {
    left: leftMargin,
    top: topMargin
  };

  return canvas
    .composite([
      {
        input: inputImage,
        gravity: 'northwest',
        left: overlayPosition.left,
        top: overlayPosition.top
      }
    ])
    .toBuffer();
};

// Superimposes an overlay image on top of a base image
export const superimposeImage = (baseImage: Buffer, overlayImage: Buffer) => {
  return sharp(baseImage)
    .composite([{ input: overlayImage }])
    .toBuffer();
};
