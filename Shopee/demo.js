const { Chromeless } = require('chromeless');
const fs = require('fs');

async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 60
		});
	
	const content = await chromeless
	  .goto('https://shareae.com/after-effects-project/page/2/')
	  .wait('.contenthead')
	  .evaluate(() => {
    // this will be executed in headless chrome
    const links = [].map.call(
      document.querySelectorAll('.contenthead'),
      a => ({title: a.innerHTML})
    )
    return JSON.stringify(links)
  })
	  // you can still use the method chaining API after evaluating
	  // when you're done, at any time you can call `.then` (in our case `await`)
	  .scrollTo(0, 1000)

	console.log(content)
	
	fs.writeFileSync('content.txt', content);
	
	await chromeless.end();
}

run().catch(console.error.bind(console));
