const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = fs.readFileSync('TVLink.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  //Go to Movie Link and Get Actor Link

  for (var i = 80; i < 120; i++) {
    const MoviePage = await chromeless
      .goto(MovieLink[i] + 'mediaindex')
      .evaluate(() => {
        const MoviePage = [].map.call(
          document.querySelectorAll('.page_list a'),
          a => a.href
        )
        return MoviePage
      })
      MoviePage.unshift(MovieLink[i] + 'mediaindex');


    //Lọc trùng ActorPage
    let MoviePagenotDup = [...new Set(MoviePage)];

    //Get ActorName
    const MovieName = await chromeless
    .evaluate(() => {
      const MovieName = [].map.call(
        document.querySelectorAll('.parent h3'),
        a => a.innerText
      )
      return MovieName
    })
    MovieName[0] = MovieName[0].replace(/([^a-zA-Z0-9().&-\s])/g, '');

    //Go to Page to Get Media
    var MovieMediaAll = new Array();
    for (var j = 0; j < MoviePagenotDup.length; j++) {
      const MovieMedia = await chromeless
        .goto(MoviePagenotDup[j])
        .evaluate(() => {
          const MovieMedia = [].map.call(
            document.querySelectorAll('.media_index_thumb_list a'),
            b => b.href
          )
          return MovieMedia
        })
        MovieMediaAll.push(...MovieMedia);
    }
    //Go to Media to Get Download Link
    var MovieDownloadLinkAll ="";
    for (var k = 0; k < MovieMediaAll.length; k++) {
      // for (var k = 0; k < 3; k++) {
      const MovieDownloadLink = await chromeless
        .goto(MovieMediaAll[k])
        .evaluate(() => {
          const MovieDownloadLink = [].map.call(
            document.querySelectorAll('.pswp__img'),
            c => c.currentSrc + "\n"
          )
          return MovieDownloadLink
        })

        MovieDownloadLinkAll += MovieDownloadLink[3]
    }
    fs.writeFileSync(i + '.' + MovieName[0] + '.txt', MovieDownloadLinkAll);
  }
 
  await chromeless.end();
}
run().catch(console.error.bind(console));

