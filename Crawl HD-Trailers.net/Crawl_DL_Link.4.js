const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = fs.readFileSync('MovieLink.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  //Go to Movie Link and Get Download Link

  for (var i = 2000; i < 2500; i++) {
    const MoviePage = await chromeless
      .goto(MovieLink[i])
      .evaluate(() => {
        const MoviePage = [].map.call(
          document.querySelectorAll('.bottomTableResolution a'),
          a => a.href + '\n'
        )
        return MoviePage
      })

    //Filter All 1080p link
    var Movie1080 = MoviePage.filter(MoviePage => MoviePage.indexOf('1080') > -1);

    //Get MovieName
    const MovieName = await chromeless
    .evaluate(() => {
      const MovieName = [].map.call(
        document.querySelectorAll('.previewTitle'),
        a => a.innerText
      )
      return MovieName
    })

    //Clear Special Character on MovieName
    MovieName[0] = MovieName[0].replace(/([^a-zA-Z0-9().&-\s])/g, '');

    //Write File
    fs.appendFileSync(i + '. ' + MovieName[0] + '.txt', Movie1080);
    fs.appendFileSync(MovieName[0] + '.txt', Movie1080);

  }
 
  await chromeless.end();
}
run().catch(console.error.bind(console));

