const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		launchChrome: true,
		waitTimeout: 600000
        });

var content = "";
for(var i = 0; i < 3; i++){  
    const links = await chromeless
    .goto('https://www.imdb.com/name/nm0488953/mediaviewer/rm2004184320')
    .evaluate(() => {
      const links = [].map.call(
      document.querySelectorAll('.pswp__img'),
      a => a.currentSrc+"\n"
    )
    return links
  })
  content += links[3]
}

	
	fs.writeFileSync('demo.txt', content);
	
	await chromeless.end();
}
run().catch(console.error.bind(console));
