const sharp = require('sharp');

async function processLogo() {
  const input = 'public/images/mv-groups-logo.jpg';
  
  // Create a circular SVG mask
  const width = 1024;
  const height = 1024;
  const circleSvg = Buffer.from(
    `<svg><circle cx="${width/2}" cy="${height/2}" r="${width/2}" /></svg>`
  );

  // Apply the mask and save as PNG
  await sharp(input)
    .resize(width, height)
    .composite([{
      input: circleSvg,
      blend: 'dest-in'
    }])
    .png()
    .toFile('public/images/mv-groups-logo.png');
    
  console.log('Logo processed into transparent circle png.');
}

processLogo().catch(console.error);
