const fs = require('fs');
const { createCanvas } = require('canvas');


function textToImage(text, maxWidth) {
    const canvas = createCanvas(512, 616);
    const context = canvas.getContext('2d');
    context.font = '22px Arial';

    const words = text.split(' ');
    const lines = [];
    let line = '';

    words.forEach(word => {
        if (context.measureText(line + word).width > maxWidth) {
            lines.push(line.trim());
            line = word + ' ';
        } else {
            line += word + ' ';
        }
    });

    lines.push(line.trim());

    const lineHeight = parseInt(context.font);
    const verticalPadding = 276+Math.floor((canvas.height - lines.length * lineHeight) / 2);

    lines.forEach((line, i) => {
        const horizontalPadding = Math.floor((canvas.width - context.measureText(line).width) / 2);
        context.fillText(line, horizontalPadding, verticalPadding + i * lineHeight);
    });

    return canvas.toBuffer();
}

// Example usage
// const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.";
// const maxWidth = 512;
// const imageBuffer = textToImage(text, maxWidth);
// fs.writeFileSync('text.png', imageBuffer);

module.exports = textToImage;