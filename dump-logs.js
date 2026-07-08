const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--allow-file-access-from-files'
    ]
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`PAGE LOG: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log(`PAGE ERROR: ${err.message}`);
  });

  page.on('response', response => {
    if (!response.ok()) {
      console.log(`FAILED RESPONSE: ${response.url()} - ${response.status()}`);
    }
  });

  await page.goto('http://localhost:8080');
  
  // wait 5 seconds for things to load
  await new Promise(r => setTimeout(r, 5000));
  
  const logContent = await page.evaluate(() => {
    // Il logDiv ha un position:absolute, trova tutti gli elementi
    const divs = document.querySelectorAll('div');
    for (const div of divs) {
      if (div.style.zIndex === '9999') {
        return div.innerHTML.replace(/<br\s*\/?>/ig, '\n').replace(/<[^>]+>/g, '');
      }
    }
    return "Log div not found";
  });
  console.log("=== APP LOGS ===");
  console.log(logContent);
  
  await browser.close();
})();
