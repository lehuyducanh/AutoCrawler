const { Chromeless } = require('chromeless');
const fs = require('fs');
var ViCareHNLink = fs.readFileSync('LinkViCareHN.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";
  var quanly = "";
  for (var i = 0; i <= 1000; i++) {
    const moigioi = await chromeless
      .goto(BDSLink[i])
      .evaluate(() => {
        const moigioi = [].map.call(
          document.querySelectorAll('.div-table-cell.table2 .table-detail .right'),
          a => a.innerHTML
        )
        return moigioi
      })
  
    const danhmuc = await chromeless
      .evaluate(() => {
        const danhmuc = [].map.call(
          document.querySelectorAll('.div-table-cell.table1 .table-detail .right'),
          a => a.innerHTML
        )
        return danhmuc
      })
      for (var x = 0; x < danhmuc.length; x++){
        danhmuc[x] = danhmuc[x].replace(/\n/g,'') + '|'
      }

      const title = await chromeless
      .evaluate(() => {
        const title = [].map.call(
          document.querySelectorAll('.pm-title'),
          a => a.innerText
        )
        return title
      })

    content += title + '|' + danhmuc[0] + moigioi + '\n';
    content = content.replace(/,/g,'');
    quanly += '|' + danhmuc + '\n'
  }
  console.log('content',content);
  console.log('quanly',quanly);

  fs.writeFileSync('Info222.txt', content);
  fs.writeFileSync('Quanly222.txt', quanly);

  await chromeless.end();
}

run().catch(console.error.bind(console));