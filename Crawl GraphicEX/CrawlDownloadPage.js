const { Chromeless } = require('chromeless');
const fs = require('fs');

var AllDownloadLink = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  for (var i = 1; i < 107; i++) {
    const DLLink = await chromeless
      .goto('http://graphicex.com/photoshop/resume-and-cv/page/'+i)
      .evaluate(() => {
        const DLLink = [].map.call(
          document.querySelectorAll('.blocktitle .module-title a'),
          a => a.href + '\n'
        )
   
        return DLLink
      })
      AllDownloadLink += DLLink
  }
  fs.appendFileSync("DownloadPage.txt", AllDownloadLink);
  await chromeless.end();
}
run().catch(console.error.bind(console));

