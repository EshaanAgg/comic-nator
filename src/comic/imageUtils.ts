import { createCanvas, loadImage } from 'canvas';
import { textToImage } from './textUtils';
import { generateBaseComic } from './requestUtils';

const leftMargin = 8;
const topMargin = 8;

const createPolaroid = async (inputImage: Buffer) => {
  const image = await loadImage(inputImage);

  const canvasWidth = image.width + 16;
  const canvasHeight = image.height + 104;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(image, leftMargin, topMargin);

  // Convert canvas to Buffer
  return canvas.toBuffer('image/png');
};

// // Converts an image to polaroid by adding whitespace to add text
// const createPolaroid = async (inputImage: Buffer) => {
//   const image = sharp(inputImage);

//   const metadata = await image.metadata();
//   const canvasWidth = (metadata.width || 0) + 16;
//   const canvasHeight = (metadata.height || 0) + 104;

//   const canvas = sharp({
//     create: {
//       width: canvasWidth,
//       height: canvasHeight,
//       channels: 4,
//       background: {
//         r: 255,
//         g: 255,
//         b: 255,
//         alpha: 1
//       }
//     }
//   });

//   const overlayPosition = {
//     left: leftMargin,
//     top: topMargin
//   };

//   return canvas
//     .composite([
//       {
//         input: inputImage,
//         gravity: 'northwest',
//         left: overlayPosition.left,
//         top: overlayPosition.top
//       }
//     ])
//     .toBuffer();
// };

// // Superimposes an overlay image on top of a base image
// const superimposeImage = (baseImage: Buffer, overlayImage: Buffer) => {
//   return sharp(baseImage)
//     .composite([{ input: overlayImage }])
//     .toBuffer();
// };

const superimposeImage = async (baseImage: Buffer, overlayImage: Buffer) => {
  // Load images
  const base = await loadImage(baseImage);
  const overlay = await loadImage(overlayImage);

  // Create a canvas with the dimensions of the base image
  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  // Draw the base image on the canvas
  ctx.drawImage(base, 0, 0);

  // Draw the overlay image on top of the base image
  ctx.drawImage(overlay, 0, 0, overlay.width, overlay.height);

  // Convert canvas to Buffer
  return canvas.toBuffer('image/png');
};

// Generates a comic panel
export const generateComicPanel = async (description: string, caption: string) => {
  const baseImage = await generateBaseComic(description);
  const polaroid = await createPolaroid(baseImage);
  return await superimposeImage(polaroid, textToImage(caption, 496));
};
