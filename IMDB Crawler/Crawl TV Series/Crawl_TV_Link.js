const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieCat = "https://www.imdb.com/chart/toptv/?sort=nv,desc&mode=simple&page=1";

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 600000
  });
  
   const TVLink = await chromeless
      .goto(MovieCat)
      .evaluate(() => {
        const TVLink = [].map.call(
            document.querySelectorAll('.titleColumn a'),
            a => a.href.substr(0, 37) + "\n"
        )
        return TVLink;
      })
  

fs.writeFileSync("TVLink.txt", TVLink);
await chromeless.end();
}

run().catch(console.error.bind(console));