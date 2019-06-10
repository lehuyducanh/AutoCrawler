const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		launchChrome: true,
		waitTimeout: 600000
		});
   
var content = "";
for(var i = 1; i<=635; i++){
  const links = await chromeless
  .goto('https://vicare.vn/danh-sach/bac-si/ha-noi/nghenghiep-bac-si?page='+i)
  .evaluate(() => {
      const links = [].map.call(
      document.querySelectorAll('.info h2 a'),
      a => a.href+"\n"
    )
    return links
  })
     content += links; 
}
	
	fs.writeFileSync('LinkBSViCareHN.txt', content);
	
	await chromeless.end();
}

run().catch(console.error.bind(console));
