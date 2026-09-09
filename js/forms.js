// forms.js - validation for enquiry + resume + search/filter docs
(function(){
  const emailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const phoneOk=v=>/^[6-9]\d{9}$/.test(v.replace(/[\s+\-]/g,'').slice(-10));
  function wire(id){
    const f=document.getElementById(id);if(!f)return;
    f.addEventListener('submit',e=>{
      e.preventDefault();let ok=true;
      f.querySelectorAll('[data-req]').forEach(inp=>{
        const wrap=inp.closest('.field');wrap&&wrap.classList.remove('invalid');
        const v=inp.value.trim();let bad=!v;
        if(!bad&&inp.type==='email'&&!emailOk(v))bad=true;
        if(!bad&&inp.dataset.phone!==undefined&&inp.value.trim()!==''&&!phoneOk(v))bad=true;
        if(!bad&&inp.dataset.min&&v.length<+inp.dataset.min)bad=true;
        if(bad){ok=false;wrap&&wrap.classList.add('invalid');}
      });
      const msg=f.parentElement.querySelector('.form-msg')||f.querySelector('.form-msg');
      if(!ok){msg&&(msg.className='form-msg bad',msg.textContent='Please correct the highlighted fields and try again.');return;}
      msg&&(msg.className='form-msg ok',msg.textContent='Thank you! Your submission has been received. The college will contact you shortly. (Demo: no backend connected.)');
      f.reset();
      // WhatsApp deep-link hint on enquiry form
      if(id==='enquiryForm'){const a=document.getElementById('waLink');a&&(a.style.display='inline-flex');}
    });
    f.querySelectorAll('input,select,textarea').forEach(i=>i.addEventListener('input',()=>i.closest('.field')&&i.closest('.field').classList.remove('invalid')));
  }
  wire('enquiryForm');wire('resumeForm');wire('contactMini');

  // Downloads search/filter
  const q=document.getElementById('docSearch');
  if(q){q.addEventListener('input',()=>{
    const v=q.value.toLowerCase();
    const cat=(document.getElementById('docFilter')||{}).value||'all';
    document.querySelectorAll('#docGrid .doc-card').forEach(d=>{
      const t=d.textContent.toLowerCase();
      d.style.display=((cat==='all'||d.dataset.cat===cat)&&t.includes(v))?'':'none';
    });
  });
  const df=document.getElementById('docFilter');
  df&&df.addEventListener('change',()=>q.dispatchEvent(new Event('input')));
  }
})();
