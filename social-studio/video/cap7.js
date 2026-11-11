const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',args:['--no-sandbox','--ignore-certificate-errors']});
const c=await b.newContext({viewport:{width:900,height:1100},ignoreHTTPSErrors:true});const p=await c.newPage();
await p.goto('https://www.nhyirabahotel.com/',{waitUntil:'load',timeout:45000}).catch(()=>{});await p.waitForTimeout(4000);
const h=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<Math.min(h,6000);y+=400){await p.evaluate(yy=>window.scrollTo(0,yy),y);await p.waitForTimeout(300)}
await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(1500);
await p.screenshot({path:'assets/s7-nhyiraba.jpg',type:'jpeg',quality:92,fullPage:true,clip:{x:0,y:0,width:900,height:Math.min(2250,h)}});
console.log('pageH',h);await b.close()})();
