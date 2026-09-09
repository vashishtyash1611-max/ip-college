// animations.js - IntersectionObserver reveals + counters + accordions + tabs
(function(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.img-reveal').forEach(el=>io.observe(el));

  // Counters
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    const el=e.target,end=parseFloat(el.dataset.count||'0'),suf=el.dataset.suffix||'';
    const t0=performance.now(),dur=1400;
    const step=t=>{const k=Math.min((t-t0)/dur,1),v=Math.round(end*(1-Math.pow(1-k,3)));el.textContent=v+suf;el.classList.add('pop');if(k<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  }),{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

  // Parallax (subtle)
  const px=document.querySelectorAll('[data-parallax]');
  if(px.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    addEventListener('scroll',()=>{px.forEach(el=>{const r=el.getBoundingClientRect(),off=(r.top+r.height/2-innerHeight/2)*.06;el.style.transform=`translateY(${off.toFixed(1)}px)`;});},{passive:true});
  }

  // Accordions
  document.querySelectorAll('.acc-head').forEach(h=>h.addEventListener('click',()=>{
    const item=h.parentElement,body=item.querySelector('.acc-body'),open=item.classList.toggle('open');
    body.style.maxHeight=open?body.scrollHeight+'px':'0';
  }));

  // Tabs
  document.querySelectorAll('[data-tabs]').forEach(wrap=>{
    const btns=wrap.querySelectorAll('[data-tab]'),panes=wrap.parentElement.querySelectorAll('[data-pane]');
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
      panes.forEach(p=>p.hidden=p.dataset.pane!==b.dataset.tab);
    }));
  });
})();
