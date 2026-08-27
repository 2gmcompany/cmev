(() => {
  const services = {
    consultas:'Atendimento clínico como ponto de partida para o seu cuidado.', especialidades:'Consultas em áreas de especialidade disponíveis no centro médico.', dentaria:'Cuidados de medicina[...]'
  };
  const labels = {consultas:'Consultas gerais',especialidades:'Consultas de especialidades',dentaria:'Medicina dentária',optometria:'Optometria',nutricao:'Nutrição',laboratorio:'Análises clíni[...]'};
  const header=document.querySelector('.site-header'), menu=document.querySelector('.menu-toggle'), links=document.querySelector('.nav-links');
  window.addEventListener('scroll',()=>header.classList.toggle('is-scrolled',scrollY>24),{passive:true});
  menu.addEventListener('click',()=>{const on=links.classList.toggle('is-open');menu.setAttribute('aria-expanded',on);});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('is-open')));
  document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.service; document.querySelectorAll('[data-service]').forEach(x=>x.setAttribute('aria-selected','false')); button.setAttribute('aria-selected','true');
    document.querySelector('[data-service-title]').textContent=labels[key]; document.querySelector('[data-service-copy]').textContent=services[key]; document.querySelector('[data-service-button]')[...]
  }));
  const select=document.querySelector('#form-service'); Object.entries(labels).forEach(([value,label])=>select.insertAdjacentHTML('beforeend',`<option value="${value}">${label}</option>`));
  document.querySelectorAll('.js-appointment').forEach(btn=>btn.addEventListener('click',()=>{if(btn.dataset.selected)select.value=btn.dataset.selected;document.querySelector('#contactos').scrollI[...]
  const lightbox=document.querySelector('.lightbox'); document.querySelectorAll('[data-lightbox]').forEach(item=>item.addEventListener('click',()=>{lightbox.querySelector('img').src=item.dataset.l[...]
  const form=document.querySelector('#booking-form'), status=form.querySelector('.form-status'); form.addEventListener('submit',async e=>{e.preventDefault();if(!form.checkValidity()){form.reportVa[...]
  const instagram=window.ERGOVIDA_CONFIG?.instagramUrl;if(instagram){document.querySelector('.social__box p').innerHTML='Acompanhe as actualizações da Ergovida nas redes sociais.';const a=docume[...]
  document.querySelector('#year').textContent=new Date().getFullYear();
  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rev[...]
  window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('is-hidden'),650));
})();

// ===== Renderizar links sociais (com ícones SVG) a partir de window.ERGOVIDA_CONFIG =====
(() => {
  const cfg = window.ERGOVIDA_CONFIG || {};
  const whatsappNumber = cfg.whatsappNumber ? cfg.whatsappNumber.replace(/\D/g,'') : null;

  const socialCandidates = [
    cfg.instagramUrl ? { url: cfg.instagramUrl, label: 'Instagram', svg:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm6-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>` } : null,
    cfg.facebookUrl ? { url: cfg.facebookUrl, label: 'Facebook', svg:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v7.03C18.34 21.2 22 17.06 22 12.07z"/></svg>` } : null,
    whatsappNumber ? { url: `https://wa.me/${whatsappNumber}`, label: 'WhatsApp', svg:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.4.1 12c0 2 0.5 3.9 1.4 5.6L0 24l6.7-1.7A11.9 11.9 0 0 0 12 24c6.6 0 11.9-5.4 11.9-12 0-3.2-1.3-6.2-3.4-8.3zM12 21.5c-1.7 0-3.3-.5-4.6-1.4l-.3-.2-4 .9 1-3.8-.2-.3A8.9 8.9 0 0 1 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/><path d="M17.2 14.1c-.3-.2-1.7-.9-2-.9-.3 0-.6 0-.9.3-.3.3-1 .9-1.2 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.5.1-.7.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.9-2.1-1.3-2.9-.3-.7-.6-.6-.9-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.3 1 2.6 1.2 2.8.2.3 2 3.4 5 4.7 3 .1 3.5-1.2 3.9-1.4.4-.2 1.2-.6 1.4-1.2.2-.6.2-1 .1-1.2-.1-.2-.4-.3-.7-.5z"/></svg>` } : null
  ].filter(Boolean);

  if (!socialCandidates.length) return;

  const makeLinkHtml = (item) =>
    `<a class="social-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">${item.svg}<span class="social-label" aria-hidden="true">${item.label}</span></a>`;

  const html = `<div class="social-links">${socialCandidates.map(makeLinkHtml).join('')}</div>`;

  const socialBox = document.querySelector('.social__box');
  if (socialBox) {
    // opcional: mantém o parágrafo existente e adiciona os ícones
    const existing = socialBox.querySelector('p');
    if (!existing) socialBox.insertAdjacentHTML('afterbegin','<p>Acompanhe as actualizações da Ergovida nas redes sociais.</p>');
    socialBox.insertAdjacentHTML('beforeend', html);
  }

  const footerWrap = document.querySelector('footer .wrap');
  if (footerWrap) {
    footerWrap.insertAdjacentHTML('beforeend', `<div class="footer-socials" aria-label="Redes sociais">${socialCandidates.map(makeLinkHtml).join('')}</div>`);
  }
})();
