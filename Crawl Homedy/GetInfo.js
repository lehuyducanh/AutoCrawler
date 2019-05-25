const { Chromeless } = require('chromeless');
const fs = require('fs');
var BDSLink = fs.readFileSync('ArticleHomedy.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";
  var quanly = "";
  for (var i = 0; i < BDSLink.length; i++) {
    const PhoneMoigioi = await chromeless
      .goto(BDSLink[i])
      .evaluate(() => {
        const PhoneMoigioi = [].map.call(
          document.querySelectorAll('.mb'),
          a => a.innerText
        )
        return PhoneMoigioi
      })

    const TenMoigioi = await chromeless
      .evaluate(() => {
        const TenMoigioi = [].map.call(
          document.querySelectorAll('.agency .info a'),
          a => a.innerText
        )
        return TenMoigioi
      })


    const danhmuc = await chromeless
      .evaluate(() => {
        const danhmuc = [].map.call(
          document.querySelectorAll('.breadcrumb ul'),
          a => a.innerText
        )
        return danhmuc
      })
      for (var x = 0; x < danhmuc.length; x++){
        danhmuc[x] = danhmuc[x].replace(/\n/g,'|')
      }

      const title = await chromeless
      .evaluate(() => {
        const title = [].map.call(
          document.querySelectorAll('.col-sm-8 h1'),
          a => a.innerText
        )
        return title
      })

      const ID = await chromeless
      .evaluate(() => {
        const ID = [].map.call(
          document.querySelectorAll('.product-info .code'),
          a => a.innerText
        )
        return ID
      })

    content += ID[0] + '|' + title + '|'  + TenMoigioi[0] + '|' + PhoneMoigioi[0].replace(/[^\w]/g,'') + '|'+ danhmuc + '\n';
    content = content.replace(/,/g,'');
    
  }
  console.log('content',content);
  

  fs.writeFileSync('DataHomedy25052019.txt', content);


  await chromeless.end();
}

run().catch(console.error.bind(console));