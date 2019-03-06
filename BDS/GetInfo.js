const { Chromeless } = require('chromeless');
const fs = require('fs');
var PSDKey = [
    'https://batdongsan.com.vn/ban-nha-rieng-phuong-binh-chuan/can-gap-tai-thuan-an-chi-520tr-sang-ten-so-hong-lh-0974196238-pr14324505',
    'https://batdongsan.com.vn/ban-dat-nen-du-an-duong-tinh-lo-746-xa-khanh-binh-prj-khu-dan-cu-nam-tan-uyen/1-500-mat-tien-quoc-shr-tung-xay-dung-3-tam-chi-con-8-lh-0903618890-pr19449105',
    'https://batdongsan.com.vn/ban-dat-duong-tran-van-giau-xa-le-minh-xuan/gap-lo-datchinhchu-gan-benh-vien-cho-ray-2-da-co-so-hong-bao-sang-ten-nhua-30m-pr19448572',
    'https://batdongsan.com.vn/ban-nha-mat-pho-duong-tran-cao-van-phuong-6-7/quan-3-15mx20m-gia-tot-115-ty-pr19448245',
    'https://batdongsan.com.vn/ban-nha-rieng-duong-cau-giao-khau-phuong-thanh-xuan/con-2-can-pho-3-lau-duy-t-dt-4x14m-ngay-nga-tu-ga-gia-3-450-ty-lh-0918-183-727-pr18359348',
    'https://batdongsan.com.vn/ban-nha-biet-thu-lien-ke-quan-12/mat-pho-93-8m2-tai-duong-song-hanh-12-ho-chi-minh-pr19447128'
];
   
async function run() {
	const chromeless = new Chromeless({
		lauchChrome: false,
		waitTimeout: 60000000
		});
var content = "";
for(var i = 0; i < PSDKey.length; i++){
    const name = await chromeless
    .goto(PSDKey[i])
    .evaluate(() => {
         const name = [].map.call(
        document.querySelectorAll('.div-table-cell.table2 .table-detail .right'),
        a => a.innerHTML
      )
      return name
  })

    const infoland = await chromeless
      .evaluate(() => {
         const infoland = [].map.call(
        document.querySelectorAll('.pm-title'),
        a => a.innerText
      )
      return infoland
  })
    content += infoland+'|'+name[0].replace(/\n/g,'')+'|'+name[1].replace(/\n/g,'')+'|'+name[2].replace(/\n/g,'')+'\n'; 
}
console.log(content);
	
fs.writeFileSync('Info3.txt', content);
	
await chromeless.end();
}

run().catch(console.error.bind(console));