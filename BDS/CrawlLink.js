const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 600000
		});
   
var content = "";
for(var i = 1; i<=2; i++){
  const links = await chromeless
  .goto('https://batdongsan.com.vn/nha-dat-ban/p'+i)
  .evaluate(() => {
      const links = [].map.call(
      document.querySelectorAll('.p-title h3 a'),
      a => a.href+"\n"
    )
    return links
  })
     content += links; 
}
	
	fs.writeFileSync('LinkBDS5.txt', content);
	
	await chromeless.end();
}

run().catch(console.error.bind(console));
