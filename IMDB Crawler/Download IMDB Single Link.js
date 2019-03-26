const { Chromeless } = require('chromeless');
const fs = require('fs');
var ActorLink = 'https://www.imdb.com/imdbpicks/elizabeth-olsen-through-the-years/rg899848960/';
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 600000
  });


  //Go to Link and Get Page
  const ActorPage = await chromeless
    .goto(ActorLink)
    .evaluate(() => {
      const ActorPage = [].map.call(
        document.querySelectorAll('.page_list a'),
        a => a.href
      )
      return ActorPage
    })

  //Done Get Page

  ActorPage.unshift(ActorLink);

  console.log(ActorPage)

  //Go to Page to Get Media
  var ActorMediaAll = new Array();;

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
  // ActorMediaAll = ActorMediaAll.replace(/,/g,'');
  //Done Get Media
  console.log(ActorMediaAll)

  //Go to Media to Get Download Link
  var ActorDownloadLinkAll = "";

  for (var i = 0; i < ActorMediaAll.length; i++) {
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

  fs.writeFileSync('Scarlet Witch.txt', ActorDownloadLinkAll);
  await chromeless.end();
}

run().catch(console.error.bind(console));
