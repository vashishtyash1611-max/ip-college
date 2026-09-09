// gallery.js - filters + lightbox with keyboard nav
(function(){
  // Filters
  document.querySelectorAll('.filters').forEach(bar=>{
    const btns=bar.querySelectorAll('.filter-btn');
    const grid=document.getElementById(bar.dataset.target||'galGrid');
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
      const f=b.dataset.filter;
      (grid?grid.querySelectorAll('.gal-item'):[]).forEach(it=>{
        const show=f==='all'||it.dataset.cat===f;
        it.style.display=show?'':'none';
      });
    }));
  });

  // Lightbox
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  const img=lb.querySelector('img'),count=lb.querySelector('.lb-count');
  let items=[],idx=0;
  const collect=()=>items=[...document.querySelectorAll('.gal-item')].filter(i=>i.style.display!=='none');
  const show=i=>{collect();if(!items.length)return;idx=(i+items.length)%items.length;
    const im=items[idx].querySelector('img');img.src=im.src;img.alt=im.alt;
    if(count)count.textContent=(idx+1)+' / '+items.length;};
  document.addEventListener('click',e=>{
    const it=e.target.closest('.gal-item');
    if(it){collect();show(items.indexOf(it));lb.classList.add('open');document.body.style.overflow='hidden';}
  });
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',e=>{e.stopPropagation();show(idx-1);});
  lb.querySelector('.lb-next').addEventListener('click',e=>{e.stopPropagation();show(idx+1);});
  lb.addEventListener('click',e=>{if(e.target===lb)close();});
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  addEventListener('keydown',e=>{
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);
  });
})();
