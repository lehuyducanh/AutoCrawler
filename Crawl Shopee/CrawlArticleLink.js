const { Chromeless } = require('chromeless');
const fs = require('fs');

var AllDownloadLink = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  for (var i = 0; i < 1; i++) {
    const DLLink = await chromeless
      .goto('https://shopee.vn/shop/76131168/search?page='+i+'&sortBy=pop')
      .evaluate(() => {
        const DLLink = [].map.call(
          document.querySelectorAll('item-card.simple a'),
          a => a.href + '\n'
        )
   
        return DLLink
      })
      AllDownloadLink += DLLink
      console.log(i,DLLink)
  }
  fs.appendFileSync("ProductShopee.txt", AllDownloadLink);
  await chromeless.end();
}
run().catch(console.error.bind(console));

