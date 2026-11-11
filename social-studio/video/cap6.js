const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',args:['--no-sandbox','--ignore-certificate-errors']});
async function shot(name,url,vw,vh,clipH,sel,wait){const c=await b.newContext({viewport:{width:vw,height:vh},ignoreHTTPSErrors:true});const p=await c.newPage();
await p.goto(url,{waitUntil:'load',timeout:45000}).catch(()=>{});await p.waitForTimeout(wait||3500);
const h=await p.evaluate(()=>document.documentElement.scrollHeight);
if(clipH>vh){for(let y=0;y<Math.min(h,5000);y+=400){await p.evaluate(yy=>window.scrollTo(0,yy),y);await p.waitForTimeout(250)}
await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(1500)}
let box=null;if(sel){const l=p.locator(sel).first();if(await l.count())box=await l.boundingBox()}
await p.screenshot({path:`assets/s6-${name}.jpg`,type:'jpeg',quality:92,fullPage:true,clip:{x:0,y:0,width:vw,height:Math.min(clipH,Math.max(h,vh))}});
console.log(name,'pageH',h,'box',JSON.stringify(box));await c.close()}
await shot('bia','https://www.biaeastdistrict.org/',900,1100,2250,null,4500);
await shot('aspee','https://aspee-pharma.vercel.app/overview',1200,699,699,null,4500);
await b.close()})();
