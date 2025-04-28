const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const folder = path.join(__dirname, '..', process.env.FOLDER_UPLOADS_IMAGES_ORDERS);

async function saveBase64Image(thumbUrl, fileNamePrefix = 'imagen') {
  const match = thumbUrl.match(/^data:image\/(\w+);base64,/);
  const extension = match ? match[1] : 'png';
  const base64Data = thumbUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true }); // permite crear subcarpetas
  }

  const fileName = `${fileNamePrefix}.${extension}`;
  const filePath = path.join(folder, fileName);
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Imagen guardada como: ${filePath}`);
  const publicPath = path.join('/', process.env.FOLDER_UPLOADS_IMAGES_ORDERS, fileName).replace(/\\/g, '/');
  return publicPath;
}

module.exports = saveBase64Image;
