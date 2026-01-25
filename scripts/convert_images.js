const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../public/herosectionframes");
const outputDir = inputDir; // Save in same directory

async function convertImages() {
  try {
    const files = fs
      .readdirSync(inputDir)
      .filter((file) => file.endsWith(".jpg"));
    console.log(`Found ${files.length} images to convert.`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(".jpg", ".webp"));

      // Convert to WebP with lossless quality or high quality
      // User requested "without dropping their quality" -> lossless: true
      await sharp(inputPath).webp({ lossless: true }).toFile(outputPath);

      // Optional: Progress log
      if ((i + 1) % 50 === 0) {
        console.log(`Converted ${i + 1}/${files.length} images...`);
      }
    }
    console.log("All images converted successfully!");
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

convertImages();
