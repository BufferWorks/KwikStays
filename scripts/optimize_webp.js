const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../public/herosectionframes");
const tempDir = path.join(__dirname, "../public/herosectionframes_optimized");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

async function optimizeImages() {
  try {
    const files = fs
      .readdirSync(inputDir)
      .filter((file) => file.endsWith(".webp"));
    console.log(`Found ${files.length} images to optimize.`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(tempDir, file);

      // Re-compress: Resize to 720p logic (1280 width) and lower quality
      await sharp(inputPath)
        .resize({ width: 1280 }) // 1280px width maintains good quality for background but saves pixels
        .webp({ quality: 65, lossless: false }) // 65 quality is usually transparency-safe and good for video frames
        .toFile(outputPath);

      if ((i + 1) % 50 === 0) {
        console.log(`Optimized ${i + 1}/${files.length} images...`);
      }
    }
    console.log("All images optimized to temporary folder.");

    // Move back? Or let user verify?
    // Let's replace them to keep code simple, but I'll update the script to just overwrite if I was brave.
    // Safety: Save to temp, then user can replace.
    // Actually, I'll programmatically swap folders to be efficient.
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
