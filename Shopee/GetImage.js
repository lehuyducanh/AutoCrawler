const { Chromeless } = require('chromeless');
const fs = require('fs');
var BDSLink = fs.readFileSync('LinkBDS5.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";
  var name = "";
  for (var i = 0; i < BDSLink.length; i++) {
    const ProductName = await chromeless
      .goto(BDSLink[i])
      .wait(1000)
      .evaluate(() => {
        const ProductName = [].map.call(
          document.querySelectorAll('.title.r16'),
          a => a.innerText
        )
        return ProductName
      })
  

    const ImageLink = await chromeless
      .evaluate(() => {
        const ImageLink = [].map.call(
          document.querySelectorAll('.item.swiper-slide img'),
          a => a.currentSrc + '\n'
        )
        return ImageLink
      })
      
      fs.writeFileSync(i + '.' + ProductName[1].replace(/\//,'') + '.txt',ImageLink);
  
  }
 
 
 

  await chromeless.end();
}

run().catch(console.error.bind(console));