import { chromium } from 'playwright-core'
const out = process.argv[2]
const b = await chromium.launch({ channel: 'chrome' })
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
const errs = []
p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message))
await p.goto('http://localhost:4173/', { waitUntil: 'load' })
await p.waitForTimeout(3500)
await p.screenshot({ path: `${out}/f-hero.png` })
const h = await p.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < h; y += 450) { await p.evaluate(y => scrollTo(0,y), y); await p.waitForTimeout(180) }
// everything must be square EXCEPT the logo marks and the WhatsApp icon
const rounded = await p.evaluate(() => {
  const out = []
  document.querySelectorAll('*').forEach(el => {
    const r = getComputedStyle(el).borderRadius
    if (r && r !== '0px' && r !== '')
      out.push(el.tagName + (el.getAttribute('alt') || el.getAttribute('aria-label') || '') + ' -> ' + r)
  })
  return [...new Set(out)]
})
await p.evaluate(() => scrollTo(0,0)); await p.waitForTimeout(900)
await p.screenshot({ path: `${out}/f-nav.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } })
console.log('rounded elements:', rounded.length ? rounded.join('  |  ') : 'NONE')
console.log('errors:', errs.length ? errs.join('\n') : 'none')
await b.close()
