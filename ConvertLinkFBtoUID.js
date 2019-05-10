const { Chromeless } = require('chromeless');
const fs = require('fs');
var LinkFB = fs.readFileSync('LinkFB.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  //Go to Movie Link and Get Download Link

  for (var i = 0; i < LinkFB.length; i++) {
    const MoviePage = await chromeless
      .goto(LinkFB[i])
      .evaluate(() => {
        const UID = [].map.call(
          document.querySelectorAll('.bottomTableResolution a'),
          a => a.href + '\n'
        )
        return UID
      })

  }
 
  await chromeless.end();
}
run().catch(console.error.bind(console));

