const { Jimp } = require("jimp");

async function trimIcon() {
  try {
    console.log("Reading public/favicon.png...");
    // Jimp 1.6+ usage
    const image = await Jimp.read("public/favicon.png");
    
    console.log("Autocropping...");
    image.autocrop();
    
    console.log("Saving cropped image...");
    await image.write("public/favicon.png");
    console.log("Successfully increased favicon size by removing transparent borders!");
  } catch (err) {
    console.error("Error cropping image:", err);
  }
}

trimIcon();
