'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const ctx=vm.createContext({window:{},console});
for(const f of ['content/part-1.js','content/part-2.js','content/part-3.js','content/catalogue.js','labs.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const {ECON,LABS,EconMath:M}=ctx.window;
const expected=[];
for(const [start,end] of [[4,17],[19,37],[39,53],[55,62],[64,83],[85,100],[102,122],[124,137],[139,150],[152,171],[173,183]])for(let p=start;p<=end;p++)expected.push(p);
assert.equal(ECON.lessons.length,170);
assert.deepEqual(Array.from(ECON.lessons,l=>l.page),expected);
assert.equal(new Set(ECON.lessons.map(l=>l.page)).size,170);
assert.equal(ECON.chapters.length,11);
assert.equal(LABS.items.length,12);
assert.equal(ECON.resources.length,12);
for(const l of ECON.lessons){assert.ok(l.title&&l.concept&&l.key);assert.ok(l.paragraphs.length>=1);assert.ok(ECON.chapters.some(c=>c.id===l.chapter));if(l.lab)assert.ok(LABS.items.some(x=>x.id===l.lab));if(l.quiz)assert.ok(l.quiz[2]>=0&&l.quiz[2]<l.quiz[1].length);}
for(const c of ECON.chapters)assert.ok(LABS.items.some(x=>x.id===c.lab));
for(const lab of LABS.items){for(const p of lab.pages)assert.ok(ECON.lessons.some(x=>x.page===p));let variants=[{}];for(const c of lab.controls){const values=c.options?c.options.map(x=>x[0]):[c.min,c.value,c.max];variants=variants.flatMap(v=>values.map(x=>({...v,[c.key]:x})));}for(const value of variants){const result=M[lab.id](value);for(const [key,n] of Object.entries(result))if(typeof n==='number')assert.ok(Number.isFinite(n),lab.id+' '+key);const html=LABS.output(lab.id,value);assert.ok(html.length>100);assert.ok(!/NaN|Infinity|undefined/.test(html),lab.id+' invalid output');}console.log('PASS model extremes',lab.id,variants.length);}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(M.revenue({priceChange:10,quantityChange:-20}).revenue,88000);
near(M.revenue({priceChange:10,quantityChange:-20}).change,-12);
near(M.business({price:10000,cost:6000,fixed:400000,sales:100}).bep,100);
near(M.business({price:10000,cost:6000,fixed:400000,sales:100}).profit,0);
assert.equal(M.business({price:6000,cost:6000,fixed:400000,sales:100}).bep,null);
near(M.compound({principal:100,rate:5,years:2,inflation:0}).compound,110.25);
near(M.leverage({debt:100,change:-10}).net,80);
for(const v of [{loan:100,repay:40,loss:0,withdraw:0},{loan:0,repay:100,loss:15,withdraw:30}]){const a=M.bank(v);near(a.assets,a.deposits+a.equity);assert.ok(a.cash>=0);}
const base=M.market({demand:12,supply:2,cap:0});near(base.p,7);near(base.q,5);
near(M.market({demand:14,supply:2,cap:0}).q,6);
near(M.market({demand:12,supply:4,cap:0}).p,8);
near(M.market({demand:12,supply:2,cap:5}).shortage,4);
const tax=M.tax({demandSlope:.7,supplySlope:.3,tax:10});near(tax.buyer,107);near(tax.seller,97);near(tax.buyerBurden+tax.sellerBurden,10);
near(M.inflation({weight:40,food:10,other:0,income:0}).change,4);
near(M.jobs({jobs:0,giveup:5}).unemployment,5/95*100);near(M.jobs({jobs:0,giveup:5}).employment,75);
const trade=M.trade({bread:4,ratio:.75});near(trade.aGain,1);near(trade.bGain,1);
const a=M.insurance({members:100,probability:1,loss:100,risk:'independent'}),b=M.insurance({members:400,probability:1,loss:100,risk:'independent'});near(a.meanSd/2,b.meanSd);near(a.per,1);
for(const file of ['index.html','styles.css','labs.js','app.js']){const data=fs.readFileSync(file,'utf8');assert.ok(!/localStorage|sessionStorage|document\.cookie|google-analytics|gtag\(/.test(data),'No client tracking/storage allowed');}
console.log('PASS: 170 source lessons, 11 chapters, 12 models, 12 resources and reference calculations.');
