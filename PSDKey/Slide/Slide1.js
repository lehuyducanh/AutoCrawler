const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 600000
		});
var content = "";
for(var i = 1; i<=391; i++){
    const links = await chromeless
    .goto('http://psdkeys.com/powerpoint/page/'+i+'/')
    .evaluate(() => {
         const links = [].map.call(
        document.querySelectorAll('.btl'),
        a => ({title: a.innerHTML})
      )
      return JSON.stringify(links)
  })
   .scrollTo(0, 1000)
   content += links; 
}
console.log(content);
	
fs.writeFileSync('SlideLink-1.txt', content);
	
await chromeless.end();
}

run().catch(console.error.bind(console));
