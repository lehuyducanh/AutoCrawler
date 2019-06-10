const { Chromeless } = require('chromeless');
const fs = require('fs');
var ViCareHNLink = fs.readFileSync('LinkBSViCareHN.txt').toString().split("\n");
async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";

  for (var i = 0; i < ViCareHNLink.length; i++) {
    const TenCoSo = await chromeless
      .goto(ViCareHNLink[i]+'#!thong-tin-chi-tiet')
      .evaluate(() => {
        const TenCoSo = [].map.call(
          document.querySelectorAll('.body h1'),
          a => a.innerText
        )
        return TenCoSo
      })

    const PhoneNumber = await chromeless
      .evaluate(() => {
        const PhoneNumber = [].map.call(
          document.querySelectorAll('.collapsible-container.collapsible-block.expanded.screen-lg'),
          a => a.innerHTML
        )
        return PhoneNumber
      })

    const Address = await chromeless
      .evaluate(() => {
        const Address = [].map.call(
          document.querySelectorAll('.cms p'),
          a => a.innerText
        )
        return Address
      })

    content += TenCoSo + '|' + PhoneNumber[1] + '\n';

  }

  fs.writeFileSync('InfoBSHN10062019+Chucvu.txt', content);

  await chromeless.end();
}

run().catch(console.error.bind(console));