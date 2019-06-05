const { Chromeless } = require('chromeless');
const fs = require('fs');
var InstaLink = fs.readFileSync('SlideSocialMedia-29052019.txt').toString().split("\n");
var AllDownloadLink = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  for (var i = 0; i < InstaLink.length; i++) {
    const DLLink = await chromeless
      .goto(InstaLink[i])
      .evaluate(() => {
        const DLLink = [].map.call(
          document.querySelectorAll('.quote a'),
          a => a.href + '\n'
        )
   
        return DLLink
      })
      AllDownloadLink += DLLink
  }
  fs.appendFileSync("SocialDownloadLink-29052019.txt", AllDownloadLink);
  await chromeless.end();
}
run().catch(console.error.bind(console));

