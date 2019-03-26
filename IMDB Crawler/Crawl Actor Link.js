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
        a => a.href
      )
      return ActorLink
    })

  for (var i = 0; i < ActorLink.length; i++) {
  ActorLink[i] = ActorLink[i].substr(0, 36)
}

  fs.writeFileSync('ActorLink.txt', ActorLink);
  await chromeless.end();
}

run().catch(console.error.bind(console));
