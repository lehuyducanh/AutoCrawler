const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		launchChrome: false,
		waitTimeout: 600000
		});
   
var content = "";
for(var i = 1; i<=1000; i++){
  const links = await chromeless
  .goto('https://vicare.vn/danh-sach/ca-nuoc/?page='+i)
  .evaluate(() => {
      const links = [].map.call(
      document.querySelectorAll('.info h2 a'),
      a => a.href+"\n"
    )
    return links
  })
     content += links; 
}
	
	fs.writeFileSync('LinkViCare.txt', content);
	
	await chromeless.end();
}

run().catch(console.error.bind(console));
