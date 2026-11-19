import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///home/claude/life/game.html');await pg.wait_for_timeout(500)
        await pg.evaluate("()=>localStorage.clear()");await pg.reload();await pg.wait_for_timeout(600);await pg.evaluate("()=>{newGame('王小明','男');$('start').classList.remove('on');render()}");await pg.wait_for_timeout(1000)
        await pg.screenshot(path='shots/o1.png')
        await pg.click('#coach [data-k=n]');await pg.wait_for_timeout(400);await pg.screenshot(path='shots/o2.png')
        await pg.click('#coach [data-k=n]');await pg.wait_for_timeout(400);await pg.screenshot(path='shots/o3.png')
        await pg.click('#coach [data-k=n]');await pg.wait_for_timeout(300)
        print('coach gone',await pg.evaluate("()=>!document.getElementById('coach')"))
        await pg.evaluate("()=>{S.age=22;S.money=9e5;S.job=null;S.school=null;render()}");await pg.wait_for_timeout(300)
        await pg.screenshot(path='shots/o4.png')
        await pg.click('#fxb');await pg.wait_for_timeout(300);await pg.screenshot(path='shots/o5.png')
        await pg.fill('#fxq','股票');await pg.wait_for_timeout(200);await pg.screenshot(path='shots/o6.png')
        await pg.click('.fxi');await pg.wait_for_timeout(500);await pg.screenshot(path='shots/o7.png')
        await pg.evaluate("()=>{handle('close');S.partner={n:'小美',rel:50,married:false};showSheet('rel');}");await pg.wait_for_timeout(200)
        await pg.evaluate("()=>{S.money=10;showSheet('job')}");await pg.wait_for_timeout(300);await pg.screenshot(path='shots/o8.png')
        await pg.evaluate("()=>{handle('dropout')}");await pg.wait_for_timeout(300);await pg.screenshot(path='shots/o9.png')
        print(errs);await b.close()
asyncio.run(main())
