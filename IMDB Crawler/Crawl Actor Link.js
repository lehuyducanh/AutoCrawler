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
  for (var i = 0; i < 3; i++) {
    const ActorPage = await chromeless
      .goto(ActorLink[i] + 'mediaindex')
      .evaluate(() => {
        const ActorPage = [].map.call(
          document.querySelectorAll('.page_list a'),
          a => a.href
        )
        return ActorPage;
      })
    
    const ActorFile = await chromeless
      .evaluate(() => {
        const ActorFile = [].map.call(
          document.querySelectorAll('.parent h3 a'),
          a => a.innerText
        )
        return ActorFile;
      })
    ActorPage.push(ActorLink[i] + 'mediaindex');

  }
  console.log("Actor Name", ActorFile)
  console.log("Actor Page", ActorPage)
  fs.writeFileSync(ActorFile + '.txt', ActorLink);
  await chromeless.end();
}

run().catch(console.error.bind(console));
