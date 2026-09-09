// navigation.js - header, mobile drawer, dropdowns, active links, page transitions
(function(){
  const header=document.getElementById('siteHeader');
  const progress=document.getElementById('scrollProgress');
  const backTop=document.getElementById('backTop');
  const onScroll=()=>{
    const y=window.scrollY;
    if(header)header.classList.toggle('scrolled',y>10);
    if(backTop)backTop.classList.toggle('show',y>500);
    if(progress){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(y/h)*100:0)+'%';}
  };
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(backTop)backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  // Active link
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.nav-menu a,.drawer nav a').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if(href===page||(page===''&&href==='index.html'))a.classList.add('active');
  });

  // Drawer
  const ham=document.getElementById('hamburger'),drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim'),closeBtn=document.getElementById('drawerClose');
  const openD=()=>{drawer&&drawer.classList.add('open');scrim&&scrim.classList.add('show');document.body.style.overflow='hidden';};
  const closeD=()=>{drawer&&drawer.classList.remove('open');scrim&&scrim.classList.remove('show');document.body.style.overflow='';};
  ham&&ham.addEventListener('click',openD);closeBtn&&closeBtn.addEventListener('click',closeD);scrim&&scrim.addEventListener('click',closeD);
  addEventListener('keydown',e=>{if(e.key==='Escape')closeD();});

  // Mobile accordions
  document.querySelectorAll('.m-drop-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const sub=btn.nextElementSibling,open=btn.classList.toggle('open');
      btn.querySelector('i').style.transform=open?'rotate(180deg)':'';
      sub.style.maxHeight=open?sub.scrollHeight+'px':'0';
    });
  });

  // Page transition (quick fade)
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(!href||href.startsWith('#')||a.target==='_blank')return;
      e.preventDefault();closeD();
      document.body.classList.add('page-fade');
      setTimeout(()=>{location.href=href;},180);
    });
  });

  // Preloader
  const pre=document.getElementById('preloader'),bar=document.getElementById('loadBar');
  let p=0;const t=setInterval(()=>{p=Math.min(p+Math.random()*28,92);if(bar)bar.style.width=p+'%';},120);
  addEventListener('load',()=>{clearInterval(t);if(bar)bar.style.width='100%';setTimeout(()=>pre&&pre.classList.add('done'),350);});
  setTimeout(()=>{clearInterval(t);pre&&pre.classList.add('done');},3500);
})();
