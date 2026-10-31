"""One-time, deterministic source refinement from the visual review.
Only the three named website source files are changed. No remote data is read.
"""
from pathlib import Path

root = Path.cwd()
p = root / 'labs.js'
s = p.read_text()
a = s.index('function bars(rows,')
b = s.index('\nfunction message', a)
new = '''function bars(rows,{unit='',caption='수치 비교',max=null}={}){
 const negative=rows.some(r=>r[1]<0),absMax=max||Math.max(1,...rows.map(r=>Math.abs(r[1]))),left=20,right=660,zero=negative?340:left,scale=(negative?320:640)/absMax,rowH=78,height=rows.length*rowH+10;
 return `<svg class="chart chart-bars" viewBox="0 0 680 ${height}" role="img" aria-label="${esc(caption)}"><title>${esc(caption)}</title>`+rows.map(([name,val,grey],i)=>{const yy=8+i*rowH,len=Math.abs(val)*scale,start=val<0?zero-len:zero;return `<text x="${left}" y="${yy+20}">${esc(name)}</text><text x="${right}" y="${yy+20}" text-anchor="end">${esc(fmt(val,2))}${esc(unit)}</text><rect x="${start}" y="${yy+33}" width="${len}" height="26" fill="${grey?'#aaa99f':'#20211f'}"/><path d="M${zero} ${yy+29}v34" stroke="#76776e" fill="none"/>`;}).join('')+'</svg>';
}'''
s = s[:a] + new + s[b:]
s = s.replace('<svg class="chart" viewBox="0 0 ${w} ${h}"', '<svg class="chart chart-line" viewBox="0 0 ${w} ${h}"')
p.write_text(s)

p = root / 'styles.css'
s = p.read_text()
marker = '/* Final chart and small-screen readability pass. */'
if marker not in s:
    s += '''
/* Final chart and small-screen readability pass. */
.chart .axis,.chart .grid{fill:none}
.chart-line text{font-size:14px}
.chart-bars text{font-size:18px}
.lesson-visual{overflow-x:auto}
@media(max-width:760px){
 .chart-line text{font-size:18px}
 .chart-bars text{font-size:24px}
 .lesson-visual svg{min-width:450px}
 .metrics{min-width:0}
 .hero-art img{image-rendering:auto}
}
'''
p.write_text(s)

p = root / 'app.js'
s = p.read_text().replace("if(hash==='#main'){", "if(hash==='#main'&&main.childElementCount){")
p.write_text(s)
