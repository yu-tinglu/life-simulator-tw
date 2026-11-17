import sys,asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///home/claude/life/game.html')
        await pg.wait_for_timeout(500)
        await pg.evaluate("()=>{newGame('王小明','男');S.ori='異性戀';$('start').classList.remove('on');render()}")
        await pg.wait_for_timeout(300)
        await pg.evaluate("""()=>{ask=(t,l,cb)=>cb(l.length-1)}""")
        for i in range(19):
            await pg.click('#ageBtn');await pg.wait_for_timeout(120)
        await pg.screenshot(path='shots/u_home.png')
        await pg.evaluate("()=>{S.age=19;S.partner=null;S.crush=[newCrush('x')];mkPartner(S.crush[0]);S.friends=[newFriend(),newFriend()];S.ap=5;render()}")
        await pg.screenshot(path='shots/u_home.png')
        await pg.evaluate("()=>{handle('ac:go:比賽')}");await pg.wait_for_timeout(250);await pg.screenshot(path='shots/v_cp.png')
        await pg.evaluate("()=>{handle('close');handle('ac:go:打工')}");await pg.wait_for_timeout(250);await pg.screenshot(path='shots/v_pt.png')
        await pg.evaluate("()=>{handle('close');showSheet('rel','partner')}");await pg.wait_for_timeout(250);await pg.screenshot(path='shots/v_pp.png')
        await pg.evaluate("()=>{handle('close');showSheet('rel')}");await pg.wait_for_timeout(250);await pg.screenshot(path='shots/v_rel.png')
        await pg.evaluate("()=>{handle('close')}")
        await pg.evaluate("()=>handle('lf:stat')");await pg.wait_for_timeout(250);await pg.screenshot(path='shots/v_stat.png');await pg.evaluate("()=>handle('close')")
        await pg.evaluate("()=>{S.job=hireJob(JOBS[40]);S.age=30;for(let i=0;i<3;i++)ageUp();view.ly=null;handle('lf:led')}");await pg.wait_for_timeout(300);await pg.screenshot(path='shots/v_led.png');await pg.evaluate("()=>handle('close')")
        await pg.evaluate("()=>{S.cn='JP';S.fx.JP=.21;S.money=3000000;showSheet('ast')}");await pg.wait_for_timeout(300);await pg.screenshot(path='shots/v_ast.png');await pg.evaluate("()=>handle('close')")
        for t in ['more']:
            await pg.click(f'.tab[data-t={t}]');await pg.wait_for_timeout(250)
            await pg.screenshot(path=f'shots/u_{t}.png')
            await pg.evaluate("()=>handle('close')")
        print(errs)
        await b.close()
asyncio.run(main())
