// Browser test for calendar daily due totals.
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),headless:true,args:['--no-sandbox','--allow-file-access-from-files']});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto('file://'+path.resolve(__dirname,'../index.html'));
    await page.locator('[data-action="pm-open"]').click();
    await page.locator('[data-pm="tab"][data-id="calendar"]').click();
    await page.locator('[name="calendarMonth"]').fill('2026-11');
    const check = async () => page.locator('.pm-calendar .pm-day').evaluateAll(days => days.map(day => {
      const money = s => { const m=s.match(/([\d,]+\.\d\d)/); return m ? Number(m[1].replaceAll(',','')) : 0; };
      const planned = Array.from(day.querySelectorAll('.pm-event')).filter(e=>e.textContent.includes('planned payment'));
      const expected = Math.round(planned.reduce((a,e)=>a+money(e.textContent),0)*100)/100;
      return {expected, shown:money(day.querySelector('.pm-day-total')?.textContent||''), count:planned.length};
    }));
    let rows=await check();assert(rows.some(x=>x.count),'sample contains planned payments');
    rows.forEach(r=>assert.equal(r.shown,r.expected,'day total must equal displayed planned payments'));
    await page.locator('[name="includePaid"]').check();rows=await check();rows.forEach(r=>assert.equal(r.shown,r.expected,'history must not add to due totals'));
    let vendors=await page.locator('[name="filterVendor"] option').evaluateAll(opts=>opts.map(o=>o.value).filter(Boolean));
    assert(vendors.length,'sample has vendors');
    for(const vendor of vendors){await page.locator('[name="filterVendor"]').selectOption(vendor);rows=await check();rows.forEach(r=>assert.equal(r.shown,r.expected,'filtered due totals must match visible allocations'));}
    assert.deepEqual(errors,[]);console.log('PASS local calendar daily totals, history and vendor filters');
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
