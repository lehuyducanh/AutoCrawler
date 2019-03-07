const { Chromeless } = require('chromeless');
const fs = require('fs');
var ViCareHNLink = fs.readFileSync('LinkViCareHN.txt').toString().split("\n");

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });
  var content = "";

  for (var i = 0; i < ViCareHNLink.length; i++) {
    const TenCoSo = await chromeless
      .goto(ViCareHNLink[i])
      .evaluate(() => {
        const TenCoSo = [].map.call(
          document.querySelectorAll('.body h1 span'),
          a => a.innerHTML
        )
        return TenCoSo
      })

    const PhoneNumber = await chromeless
      .evaluate(() => {
        const PhoneNumber = [].map.call(
          document.querySelectorAll('.text-success.info-has-icon strong a'),
          a => a.innerHTML
        )
        return PhoneNumber
      })

    const Address = await chromeless
      .evaluate(() => {
        const Address = [].map.call(
          document.querySelectorAll('.info-has-icon span'),
          a => a.innerText
        )
        return Address
      })

    content += TenCoSo + '|' + PhoneNumber[1] + '|' + Address[1] + '\n';

  }
  console.log('content', content);

  fs.writeFileSync('InfoHN.txt', content);

  await chromeless.end();
}

run().catch(console.error.bind(console));