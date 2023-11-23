import { createCanvas } from 'canvas';

export const textToImage = (text: string, maxWidth: number) => {
  const canvas = createCanvas(512, 616);
  const context = canvas.getContext('2d');
  context.font = '22px Arial';

  // Convert the text into lines
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    if (context.measureText(line + word).width > maxWidth) {
      lines.push(line.trim());
      line = word + ' ';
    } else line += word + ' ';
  });
  lines.push(line.trim());

  // Draw the lines of text after height calculation
  const lineHeight = parseInt(context.font);
  const verticalPadding = 276 + Math.floor((canvas.height - lines.length * lineHeight) / 2);

  lines.forEach((line, i) => {
    const horizontalPadding = Math.floor((canvas.width - context.measureText(line).width) / 2);
    context.fillText(line, horizontalPadding, verticalPadding + i * lineHeight);
  });

  return canvas.toBuffer();
};
