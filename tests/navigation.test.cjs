const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),main=fs.readFileSync(path.join(root,'main.js'),'utf8');
for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))if(match[1].trim())new vm.Script(match[1]);
new vm.Script(main);
assert(html.includes("isLine&&!m.confirmed?' open':''"));
for(const guard of ['spaceSanitize','spaceForget(postId)','if(!spaceNav.restoring)spaceSave()','spaceNav.entries=[];spaceNav.pos=-1','URL.revokeObjectURL(pm.preview)'])assert(html.includes(guard),guard);
const support=html.slice(html.indexOf('function supportPlaceholderHTML()'),html.indexOf('const supportOldHelp'));
assert(support.includes('disabled aria-describedby="support-inactive-status"'));assert(support.includes('Not active at the moment'));assert(support.includes('Contribute once, regularly, or never'));assert(!/href=|\$100|Stripe|fetch\(/.test(support));
assert(main.includes('app.setAboutPanelOptions'));assert(main.includes('Not active at the moment'));assert(main.includes('Contribute once, regularly, or never'));
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/guide.js'),'utf8'),ctx);const g=ctx.window.NLBGuide;assert.equal(g.length,40);assert.deepEqual([...new Set(g.map(x=>x.group))],['Quick start','How-to guides','FAQ & troubleshooting']);let groups=0,last;for(const x of g){if(x.group!==last){groups++;last=x.group;}}assert.equal(groups,3);
// Protect the existing budget renderer; version metadata is intentionally excluded.
const protectedSource=html.slice(0,html.indexOf('  // v1.6 payment workspace')).replace(/var APP_VERSION = "[^"]+"/,'var APP_VERSION = "VERSION"');
assert.equal(crypto.createHash('sha256').update(protectedSource).digest('hex'),fs.readFileSync(path.join(__dirname,'budget-renderer.sha256'),'utf8').trim());
assert(html.includes('Record continued: '));assert(html.includes('totalHeight<=pageStartY-M-22'));
console.log('PASS navigation safety/source syntax, grouped guide, inactive support and protected budget renderer');
