const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const resolutions = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 390, height: 844 }
  ];
  
  const artifactDir = '/Users/jesusferrer/.gemini/antigravity-ide/brain/d27311a1-cb99-4496-ac59-686965090a9c';
  
  for (const res of resolutions) {
    console.log(`Setting viewport: ${res.width}x${res.height}`);
    await page.setViewport({ width: res.width, height: res.height });
    
    console.log(`Navigating to http://localhost:5173...`);
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    // Wait a brief moment to ensure layouts settle
    await new Promise(r => setTimeout(r, 1000));
    
    const screenshotPath = path.join(artifactDir, `screenshot-${res.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`${res.name}: ${res.width}x${res.height} - Screenshot saved to ${screenshotPath}`);
  }
  
  await browser.close();
  console.log("Browser closed successfully.");
})().catch(err => {
  console.error("Error running Puppeteer script:", err);
  process.exit(1);
});
