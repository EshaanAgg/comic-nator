import { createPolaroid, superimposeImage } from './imageUtils';
import { textToImage } from './textUtils';

export const generateComic = async (baseImage: Buffer, caption: string) => {
  const polaroid = await createPolaroid(baseImage);
  return await superimposeImage(polaroid, textToImage(caption, 496));
};
