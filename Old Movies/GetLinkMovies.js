const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 600000
		});
var content = "";
const links = await chromeless
    .goto('https://archive.org/details/feature_films?and[]=mediatype%3A%22movies%22')
    .scrollTo(0, 10000)
    .wait(5000)
    .scrollTo(0, 20000)
    .wait(5000)
    .scrollTo(0, 30000)
    .wait(5000)
    .scrollTo(0, 40000)
    .wait(5000)
    .scrollTo(0, 50000)
    .wait(5000)
    .scrollTo(0, 60000)
    .wait(5000)
    .scrollTo(0, 70000)
    .wait(5000)
    .scrollTo(0, 80000)
    .wait(5000)
    .scrollTo(0, 90000)
    .wait(5000)
    .scrollTo(0, 100000).wait(5000)
    .scrollTo(0, 110000).wait(5000)
    .scrollTo(0, 120000).wait(5000)
    .scrollTo(0, 130000).wait(5000)
    .scrollTo(0, 140000).wait(5000)
    .scrollTo(0, 150000).wait(5000)
    .scrollTo(0, 160000).wait(5000)
    .scrollTo(0, 170000).wait(5000)
    .scrollTo(0, 180000).wait(5000)
    .scrollTo(0, 190000).wait(5000)
    .scrollTo(0, 200000).wait(5000)
    .scrollTo(0, 210000).wait(5000)
    .scrollTo(0, 220000).wait(5000)
    .scrollTo(0, 230000).wait(5000)
    .scrollTo(0, 240000).wait(5000)
    .scrollTo(0, 250000).wait(5000)
    .scrollTo(0, 260000).wait(5000)
    .scrollTo(0, 270000).wait(5000)
    .scrollTo(0, 280000).wait(5000)
    .scrollTo(0, 290000).wait(5000)
    .scrollTo(0, 300000).wait(5000)
    .scrollTo(0, 310000).wait(5000)
    .scrollTo(0, 320000).wait(5000)
    .scrollTo(0, 330000).wait(5000)
    .scrollTo(0, 340000).wait(5000)
    .scrollTo(0, 350000).wait(5000)
    .scrollTo(0, 360000).wait(5000)
    .scrollTo(0, 370000).wait(5000)
    .scrollTo(0, 380000).wait(5000)
    .scrollTo(0, 390000).wait(5000)
    .scrollTo(0, 400000).wait(5000)
    .scrollTo(0, 410000).wait(5000)
    .scrollTo(0, 420000).wait(5000)
    .scrollTo(0, 430000).wait(5000)
    .scrollTo(0, 440000).wait(5000)
    .scrollTo(0, 450000).wait(5000)
    .scrollTo(0, 460000).wait(5000)
    .scrollTo(0, 470000).wait(5000)
    .scrollTo(0, 480000).wait(5000)
    .scrollTo(0, 490000).wait(5000)
    .scrollTo(0, 500000).wait(5000)
    .scrollTo(0, 510000).wait(5000)
    .scrollTo(0, 520000).wait(5000)
    .scrollTo(0, 530000).wait(5000)
    .scrollTo(0, 540000).wait(5000)
    .scrollTo(0, 550000).wait(5000)
    .scrollTo(0, 560000).wait(5000)
    .scrollTo(0, 570000).wait(5000)
    .scrollTo(0, 580000).wait(5000)
    .scrollTo(0, 590000).wait(5000)
    .scrollTo(0, 600000).wait(5000)
    .scrollTo(0, 610000).wait(5000)
    .scrollTo(0, 620000).wait(5000)
    .scrollTo(0, 630000).wait(5000)
    .scrollTo(0, 640000).wait(5000)
    .scrollTo(0, 650000).wait(5000)
    .scrollTo(0, 660000).wait(5000)
    .scrollTo(0, 670000).wait(5000)
    .scrollTo(0, 680000).wait(5000)
    .scrollTo(0, 690000).wait(5000)
    .scrollTo(0, 700000).wait(5000)
    .scrollTo(0, 710000).wait(5000)
    .scrollTo(0, 720000).wait(5000)
    .scrollTo(0, 730000).wait(5000)
    .scrollTo(0, 740000).wait(5000)
    .scrollTo(0, 750000).wait(5000)
    .scrollTo(0, 760000).wait(5000)
    .scrollTo(0, 770000).wait(5000)
    .scrollTo(0, 780000).wait(5000)
    .scrollTo(0, 790000).wait(5000)

    .evaluate(() => {
         const links = [].map.call(
        document.querySelectorAll('.item-ttl.C.C2'),
        a => ({title: a.innerHTML})
      )
      return JSON.stringify(links)
  })
  
   content += links; 

console.log(content);
	
fs.writeFileSync('ComedyLink-1.txt', content);
	
await chromeless.end();
}

run().catch(console.error.bind(console));
