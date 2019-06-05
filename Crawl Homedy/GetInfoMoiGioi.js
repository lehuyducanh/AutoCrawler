const { Chromeless } = require('chromeless');
const fs = require('fs');
var AllPhone = [];
var AllName = [];
var AllDate = [];
var AllActive = [];
var Moigioi = [];

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 60000000
  });

  for (var i = 1; i < 716; i++) {
    const PhoneMoigioi = await chromeless
      .goto('http://homedy.com/danh-sach-nha-moi-gioi?p='+i)
      .evaluate(() => {
        const PhoneMoigioi = [].map.call(
          document.querySelectorAll('.content-right-phone a'),
          a => a.innerText
        )
        return PhoneMoigioi
      })
    AllPhone.push(...PhoneMoigioi)

    const TenMoigioi = await chromeless
      .evaluate(() => {
        const TenMoigioi = [].map.call(
          document.querySelectorAll('.content-name a'),
          a => a.innerText
        )
        return TenMoigioi
      })
    AllName.push(...TenMoigioi  )

    const DateJoin = await chromeless
      .evaluate(() => {
        const DateJoin = [].map.call(
          document.querySelectorAll('.content-center-date .up'),
          a => a.innerText
        )
        return DateJoin
      })

    AllDate.push(...DateJoin)

    const Activity = await chromeless
      .evaluate(() => {
        const Activity = [].map.call(
          document.querySelectorAll('.content-center-post .up'),
          a => a.innerText
        )
        return Activity
      })

      AllActive.push(...Activity)

     }

     for (var j = 0; j < AllPhone.length; j++) {
      Moigioi[j] = AllName[j] + '|' + AllPhone[j] + '|' + AllActive[j]  + '|' + AllDate[j] + '\n'
     }

  fs.writeFileSync('MoiGioi27052019.txt',Moigioi);


  await chromeless.end();
}

run().catch(console.error.bind(console));