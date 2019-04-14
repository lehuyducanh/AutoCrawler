const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = fs.readFileSync('MovieLink.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  //Go to Movie Link and Get Download Link

  for (var i = 6748; i < 7000; i++) {
    const MoviePage = await chromeless
      .goto(MovieLink[i])
      .evaluate(() => {
        const MoviePage = [].map.call(
          document.querySelectorAll('.bottomTableResolution a'),
          a => a.href + '\n'
        )
        return MoviePage
      })

    //Get MovieName
    const MovieName = await chromeless
    .evaluate(() => {
      const MovieName = [].map.call(
        document.querySelectorAll('.previewTitle'),
        a => a.innerText
      )
      return MovieName
    })
    MovieName[0] = MovieName[0].replace(/([^a-zA-Z0-9().&-\s])/g, '');

    for (var j = 2; j < MoviePage.length; j+=3){
      fs.appendFileSync(i + '. ' + MovieName[0] + '.txt', MoviePage[j]);
    }

  }
 
  await chromeless.end();
}
run().catch(console.error.bind(console));

