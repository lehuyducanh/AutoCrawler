const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieCatPage = fs.readFileSync('MovieCatPage.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 600000
  });
var MovieLinkAll = "";
  for (var i = 0; i < MovieCatPage.length; i++) {
      const MovieLink = await chromeless
      .goto(MovieCatPage[i])
      .evaluate(() => {
        const MovieLink = [].map.call(
            document.querySelectorAll('.overview-top h4 a'),
            a => a.href + '\n'
        )
        return MovieLink;
      })
      MovieLinkAll += MovieLink;
  }

fs.writeFileSync("MovieLink.txt", MovieLinkAll);
await chromeless.end();
}

run().catch(console.error.bind(console));