const cloudinary = require('./config/cloudinary');
const dotenv = require('dotenv');
dotenv.config();

const cloudNamesToTry = ['peptites', 'peptides531', 'helixsynergy', 'helix-synergy-cloudinary'];

async function test() {
  for (const name of cloudNamesToTry) {
    console.log(`\nTesting Cloud Name: ${name}`);
    cloudinary.config({
      cloud_name: name,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    try {
      const result = await cloudinary.api.ping();
      console.log(`Ping successful for ${name}:`, result);
      return name;
    } catch (err) {
      console.error(`Ping failed for ${name}:`, err.message || err);
    }
  }
}

test().then(winner => {
  if (winner) console.log(`\nFound it! The correct cloud name is: ${winner}`);
  else console.log("\nNo cloud name worked.");
});
