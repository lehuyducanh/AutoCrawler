const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = 'https://www.imdb.com/title/tt4154796/fullcredits';
var ActorDownloadLinkAll = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 600000
  });


  //Go to Movie Link and Get Actor Link
  const ActorLink = await chromeless
    .goto(MovieLink)
    .evaluate(() => {
      const ActorLink = [].map.call(
        document.querySelectorAll('.odd .primary_photo a'),
        a => a.href.substr(0, 36)
      )
      return ActorLink
    })


  const MovieName = await chromeless
    .evaluate(() => {
      const MovieName = [].map.call(
        document.querySelectorAll('.parent h3 a'),
        a => a.innerText
      )
      return MovieName
    })
  MovieName[0] = MovieName[0].replace(':', '');



  //Go to Actor Link and Get Page
  var ActorPageAll = new Array();
  for (var i = 0; i < 4; i++) {
    const ActorPage = await chromeless
      .goto(ActorLink[i] + 'mediaindex')
      .evaluate(() => {
        const ActorPage = [].map.call(
          document.querySelectorAll('.page_list a'),
          a => a.href
        )
        return ActorPage
      })
    ActorPage.unshift(ActorLink[i] + 'mediaindex');
    

       //Go to Page to Get Media
    var ActorMediaAll = new Array();
    for (var i = 0; i < ActorPage.length / 2; i++) {
      const ActorMedia = await chromeless
        .goto(ActorPage[i])
        .evaluate(() => {
          const ActorMedia = [].map.call(
            document.querySelectorAll('.media_index_thumb_list a'),
            b => b.href
          )
          return ActorMedia
        })
      ActorMediaAll.push(...ActorMedia);
    }


    //Go to Media to Get Download Link


    // for (var i = 0; i < ActorMediaAll.length; i++) {
      for (var i = 0; i < 3; i++) {
      const ActorDownloadLink = await chromeless
        .goto(ActorMediaAll[i])
        .evaluate(() => {
          const ActorDownloadLink = [].map.call(
            document.querySelectorAll('.pswp__img'),
            c => c.currentSrc + "\n"
          )
          return ActorDownloadLink
        })

      ActorDownloadLinkAll += ActorDownloadLink[3]
    } 
  }
  fs.writeFileSync(MovieName + '.txt', ActorDownloadLinkAll);
    await chromeless.end();
}
run().catch(console.error.bind(console));
