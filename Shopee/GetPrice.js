const { Chromeless } = require('chromeless');
const fs = require('fs');
var BDSLink = fs.readFileSync('LinkBDS5.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";
 
  for (var i = 0; i < BDSLink.length; i++) {
    const ProductName = await chromeless
    .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246')  
    .goto(BDSLink[i])
      .wait(2000)
      .scrollTo(0,1000)
      .wait(1000)
      .evaluate(() => {
        const ProductName = [].map.call(
          document.querySelectorAll('._3n5NQx'),
          a => a.innerText + '\n'
        )
        return ProductName
      })
  
       content += ProductName
  
  }
  fs.writeFileSync('Price.txt',content);
 
 

  await chromeless.end();
}

run().catch(console.error.bind(console));