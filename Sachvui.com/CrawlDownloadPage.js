const { Chromeless } = require('chromeless');
const fs = require('fs');

var AllDownloadLink = "";
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });


  for (var i = 1; i < 5; i++) {
    const DLLink = await chromeless
      .goto('https://sachvui.com/the-loai/marketing-ban-hang.html/'+i)
      .evaluate(() => {
        const DLLink = [].map.call(
          document.querySelectorAll('.col-xs-6.col-md-3.col-sm-3.ebook h5 a'),
          a => a.href + '\n'
        )
   
        return DLLink
      })
      AllDownloadLink += DLLink
  }
  fs.appendFileSync("Marketing.txt", AllDownloadLink);
  await chromeless.end();
}
run().catch(console.error.bind(console));

