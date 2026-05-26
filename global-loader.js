(function(){
  function initLoader(){
    var body=document.body;
    if(!body) return;
    if(body.querySelector('#globalPageLoader')) return;
    body.classList.add('is-loading');
    var loader=document.createElement('div');
    loader.className='page-loader';
    loader.id='globalPageLoader';
    loader.setAttribute('aria-hidden','true');
    loader.innerHTML='\n      <div class="loader-shell">\n        <img class="loader-elephant" src="assets/loading.png" alt="">\n        <div class="loader-text">LOADING</div>\n        <div class="loader-bar" aria-hidden="true"><span></span></div>\n      </div>';
    body.prepend(loader);
    window.setTimeout(function(){
      loader.classList.add('is-hidden');
      body.classList.remove('is-loading');
      window.setTimeout(function(){ if(loader && loader.parentNode){ loader.parentNode.removeChild(loader);} }, 700);
    }, 650);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initLoader);
  else initLoader();
})();
