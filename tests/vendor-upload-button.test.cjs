const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),headless:true,args:['--no-sandbox','--allow-file-access-from-files']});try{
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file://'+path.resolve(__dirname,'../index.html'));
 await page.locator('[data-action="pm-open"]').click();
 await page.locator('[data-pm="tab"][data-id="vendors"]').click();
 await page.locator('[data-pm="new-vendor"]').click();
 await page.locator('input[name="name"]').last().fill('Upload Button Test');
 await page.locator('form[data-pm-form="editor"] button[type="submit"]').click();
 await page.locator('.vendor-dash-heading').getByText('Upload Button Test').waitFor();
 // The entire payment dialog must not inherit a tooltip from its accessibility label.
 await page.locator('.vendor-dash-heading h3').hover(); await page.waitForTimeout(900);
 assert.notEqual(await page.locator('.app-tooltip.visible').count(),1,'workspace label appeared as tooltip');
 let [chooser]=await Promise.all([page.waitForEvent('filechooser'),page.locator('[data-pm="vendor-upload"]').click()]);
 assert(await chooser.element().evaluate(el=>el.isConnected),'native picker input was destroyed before selection');
 await chooser.setFiles([{name:'signed-a.pdf',mimeType:'application/pdf',buffer:Buffer.from('first signed original')},{name:'signed-b.pdf',mimeType:'application/pdf',buffer:Buffer.from('second signed original')}]);
 await page.waitForFunction(()=>document.querySelectorAll('.vd-agreements article').length===2);
 assert.match(await page.locator('#pm-save-status').innerText(),/2 agreements added/);
 await page.reload();await page.locator('[data-action="pm-open"]').click();await page.locator('[data-pm="tab"][data-id="vendors"]').click();await page.locator('.vd-vendor-card').filter({hasText:'Upload Button Test'}).locator('[data-pm="vendor-dashboard"]').click();
 assert.equal(await page.locator('.vd-agreements article').count(),2,'agreements survive restart');
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.vd-agreements article').first().getByRole('button',{name:'Download'}).click()]);
 const stream=await download.createReadStream();let chunks=[];for await(const c of stream)chunks.push(c);assert.equal(Buffer.concat(chunks).toString(),'first signed original');
 [chooser]=await Promise.all([page.waitForEvent('filechooser'),page.locator('[data-pm="vendor-upload"]').click()]);await chooser.setFiles([]);
 [chooser]=await Promise.all([page.waitForEvent('filechooser'),page.locator('[data-pm="vendor-upload"]').click()]);await chooser.setFiles({name:'third.txt',mimeType:'text/plain',buffer:Buffer.from('third')});
 await page.waitForFunction(()=>document.querySelectorAll('.vd-agreements article').length===3);assert.match(await page.locator('#pm-save-status').innerText(),/1 agreement added/);
 // Explicit button labels still produce tooltips.
 const btn=page.locator('[data-pm="vendor-upload"]');await btn.scrollIntoViewIfNeeded();await btn.hover();await page.waitForTimeout(900);if(await page.locator('.app-tooltip.visible').count())assert.match(await page.locator('.app-tooltip.visible').innerText(),/Add agreements/);
 assert.deepEqual(errors,[]);console.log('PASS actual agreement picker, persistence, cancellation, downloads and tooltip behavior');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
