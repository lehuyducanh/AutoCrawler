const { Chromeless } = require('chromeless');
const fs = require('fs');

var AllDownloadLink = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  for (var i = 1; i < 3; i++) {
    const DLLink = await chromeless
      .goto('http://homedy.com/ban-nha-dat?p='+i)
      .evaluate(() => {
        const DLLink = [].map.call(
          document.querySelectorAll('.info a'),
          a => a.href + '\n'
        )
   
        return DLLink
      })
      AllDownloadLink += DLLink
  }
  fs.appendFileSync("ArticleHomedy.txt", AllDownloadLink);
  await chromeless.end();
}
run().catch(console.error.bind(console));

