const { exec } = require("child_process");
const { createClient } = require("pexels");
require("dotenv").config();
const apikey = process.env.API_KEY;
const client = createClient(apikey);

async function getData(req, res) {
  try {
    exec("python python_script.py", async (error, stdout, stderr) => {
      if (error) {
        throw new Error(`Error: ${error.message}`);
      }
      if (stderr) {
        throw new Error(`stderr: ${stderr}`);
      }

      let responseData;
      try {
        responseData = JSON.parse(stdout);
      } catch (parseError) {
        throw new Error(`Error parsing JSON: ${parseError}`);
      }

      const filteredTags = responseData.result.tags.filter(
        (tag) => tag.confidence >= 0
      );

      const imagePromises = filteredTags.slice(0, 10).map(async (tag) => {
        const query = `${tag.tag.en}`;
        const photos = await client.photos.search({ query, per_page: 1 });
        const photo = photos.photos;
        const image_url = photo[0].src.original;
        return image_url;
      });

      const imageUrls = await Promise.all(imagePromises);
      res.json({ imageurls: imageUrls });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getData };
