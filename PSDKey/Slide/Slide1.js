const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 600000
		});
var content = "";
for(var i = 1; i<=100; i++){
    const links = await chromeless
    .goto('http://psdkeys.com/powerpoint/page/'+i+'/')
    .evaluate(() => {
         const links = [].map.call(
        document.querySelectorAll('.dpad h3 a'),
        a => a.href + "\n"
      )
      return links
  })

   content += links; 
}
console.log(content);
	
fs.writeFileSync('SlideLink-29052019.txt', content);
	
await chromeless.end();
}

run().catch(console.error.bind(console));
