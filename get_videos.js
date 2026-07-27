const https = require('https');

async function fetchVideoUrl(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.pexels.com/search/videos/${query}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Look for something like https://videos.pexels.com/video-files/12345/12345-hd_1920_1080_30fps.mp4
        const regex = /https:\/\/videos\.pexels\.com\/video-files\/\d+\/[a-zA-Z0-9_-]+\.mp4/g;
        const matches = data.match(regex);
        if (matches && matches.length > 0) {
          // find highest res if possible, or just first one
          resolve(matches[0]);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const concert = await fetchVideoUrl('concert');
  const wedding = await fetchVideoUrl('wedding');
  const corporate = await fetchVideoUrl('corporate');
  const dj = await fetchVideoUrl('dj');
  console.log('Concert:', concert);
  console.log('Wedding:', wedding);
  console.log('Corporate:', corporate);
  console.log('DJ:', dj);
}

main();
