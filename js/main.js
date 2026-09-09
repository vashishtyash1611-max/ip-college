// main.js - misc UI: footer year, ticker, modal, news render glue
(function(){
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  // Simple modal
  document.querySelectorAll('[data-modal-open]').forEach(b=>b.addEventListener('click',()=>{
    const m=document.getElementById(b.dataset.modalOpen);m&&(m.style.display='flex');
  }));
  document.querySelectorAll('[data-modal]').forEach(m=>{
    m.addEventListener('click',e=>{if(e.target===m||e.target.closest('[data-close]'))m.style.display='none';});
  });
})();
