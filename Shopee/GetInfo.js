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
      .wait(2000)
      .evaluate(() => {
        const ProductName = [].map.call(
          document.querySelectorAll('.title.r16'),
          a => a.innerText
        )
        return ProductName
      })
  

    const danhmuc = await chromeless
      .evaluate(() => {
        const danhmuc = [].map.call(
          document.querySelectorAll('.flex.items-center._1z1CEl'),
          a => a.textContent
        )
        return danhmuc
      })
      

      const ProductDescription = await chromeless
      .evaluate(() => {
        const ProductDescription = [].map.call(
          document.querySelectorAll('.description.text.L14'),
          a => a.textContent
        )
        return ProductDescription
      })

    content += ProductName + '|' + ProductDescription[0].replace(/\n/g,'') + '\n';
  
  }
  console.log('content',content);
 
  fs.writeFileSync('InfoDotaMart.txt', content);

  await chromeless.end();
}

run().catch(console.error.bind(console));