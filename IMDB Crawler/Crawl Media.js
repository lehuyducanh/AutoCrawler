const { Chromeless } = require('chromeless');
const fs = require('fs');
var ActorLink = 'https://www.imdb.com/name/nm0424060/';

var ActorDownloadLink = new Array();

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 600000
		});
   

//Go to Link and Get Page
const ActorPage = await chromeless
    .goto(ActorLink+'mediaindex')
    .evaluate(() => {
        const ActorPage = [].map.call(
        document.querySelectorAll('.page_list a'),
        a => a.href 
      )
      return ActorPage
    })

//Done Get Page

ActorPage.unshift(ActorLink+'mediaindex');

console.log(ActorPage)

//Go to Page to Get Media
var ActorMediaAll = new Array();;

for(var i = 0; i < ActorPage.length/2; i++){
  const ActorMedia = await chromeless
  .goto(ActorPage[i])
  .evaluate(() => {
      const ActorMedia = [].map.call(
      document.querySelectorAll('.media_index_thumb_list a'),
      b => b.href
    )
    return ActorMedia
  })

  ActorMediaAll.unshift(...ActorMedia);
}
// ActorMediaAll = ActorMediaAll.replace(/,/g,'');
//Done Get Media
console.log(ActorMediaAll)

//Go to Media to Get Download Link
var ActorDownloadLinkAll = "";

for(var i = 0; i < ActorMediaAll.length; i++){
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

fs.writeFileSync('Black Widow.txt', ActorDownloadLinkAll);

// var content = "";
// for(var i = 1; i<=2; i++){
//   const links = await chromeless
//   .goto('https://batdongsan.com.vn/nha-dat-ban/p'+i)
//   .evaluate(() => {
//       const links = [].map.call(
//       document.querySelectorAll('.p-title h3 a'),
//       a => a.href+"\n"
//     )
//     return links
//   })
//      content += links; 
// }
	
// 	fs.writeFileSync('LinkBDS5.txt', content);
	
	await chromeless.end();
}

run().catch(console.error.bind(console));
