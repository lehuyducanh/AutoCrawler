const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = 'https://www.imdb.com/search/name?gender=male,female&start=151&ref_=rlm';

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
        document.querySelectorAll('.lister-item-image a'),
        a => a.href.substr(0, 36)
      )
      return ActorLink
    })


  //Go to Actor Link and Get Page

  for (var i = 0; i < 50; i++) {
    const ActorPage = await chromeless
      .goto(ActorLink[i] + '/mediaindex')
      .evaluate(() => {
        const ActorPage = [].map.call(
          document.querySelectorAll('.page_list a'),
          a => a.href
        )
        return ActorPage
      })
    ActorPage.unshift(ActorLink[i] + '/mediaindex');


    //Lọc trùng ActorPage
    let ActorPagenotDup = [...new Set(ActorPage)];

    //Get ActorName
    const ActorName = await chromeless
    .evaluate(() => {
      const ActorName = [].map.call(
        document.querySelectorAll('.parent h3 a'),
        a => a.innerText
      )
      return ActorName
    })

    //Go to Page to Get Media
    var ActorMediaAll = new Array();
    for (var j = 0; j < ActorPagenotDup.length; j++) {
      const ActorMedia = await chromeless
        .goto(ActorPagenotDup[j])
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
    var ActorDownloadLinkAll ="";
    for (var k = 0; k < ActorMediaAll.length; k++) {
      // for (var k = 0; k < 3; k++) {
      const ActorDownloadLink = await chromeless
        .goto(ActorMediaAll[k])
        .evaluate(() => {
          const ActorDownloadLink = [].map.call(
            document.querySelectorAll('.pswp__img'),
            c => c.currentSrc + "\n"
          )
          return ActorDownloadLink
        })

      ActorDownloadLinkAll += ActorDownloadLink[3]
    }
    fs.writeFileSync(ActorName + '.txt', ActorDownloadLinkAll);
  }
 
  await chromeless.end();
}
run().catch(console.error.bind(console));

