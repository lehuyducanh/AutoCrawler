const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  //Go to Movie Link and Get Actor Link
var MovieLinkAll = ""
  for (var i = 1; i < 521; i++) {
    const MovieLink = await chromeless
      .goto("http://www.hd-trailers.net/page/" + i)
      .evaluate(() => {
        const MovieLink = [].map.call(
          document.querySelectorAll('.indexTableTrailerImage a'),
          a => a.href + "\n"
        )
        return MovieLink
      })
      MovieLinkAll += MovieLink

      }
  fs.writeFileSync('MovieLink.txt', MovieLinkAll);
  await chromeless.end();
}
run().catch(console.error.bind(console));

