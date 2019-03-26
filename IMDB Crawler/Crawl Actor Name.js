const { Chromeless } = require('chromeless');
const fs = require('fs');

var MovieLink = 'https://www.imdb.com/title/tt4154796/fullcredits';

async function run() {
  const chromeless = new Chromeless({
    lauchChrome: false,
    waitTimeout: 600000
  });

  //Go to Movie Link and Get Actor Link
  const ActorLink = await chromeless
    .goto(MovieLink)
    .evaluate(() => {
      const ActorLink = [].map.call(
        document.querySelectorAll('.odd .primary_photo a'),
        a => a.href.substr(0, 36)
      )
      return ActorLink
    })

  console.log(ActorLink)
  fs.writeFileSync('ActorLink.txt', ActorLink);


  await chromeless.end();
}

run().catch(console.error.bind(console));
