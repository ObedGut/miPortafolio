(() => {
'use strict';
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const order=['innova','imprima','privatikaL','privatika','skyfleeter','muravi'];
const params=new URLSearchParams(location.search);
let lang=params.get('lang')==='en'?'en':'es',userPaused=false;
try{userPaused=localStorage.getItem('wg-motion')==='paused';}catch{}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const text=(es,en)=>lang==='es'?es:en;
const link=id=>'proyecto.html?id='+id+'&lang='+lang;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let ctx,mm,lenis,tick,events,observer,hoverTween;
const films=new Map();
let heroFilmResource;
// Hosted static responses may ignore byte-range requests. A fully loaded Blob
// gives the decoder local random access, independent of server Range support.
function loadHeroFilm(source){
 if(!heroFilmResource)heroFilmResource=fetch(source,{credentials:'same-origin'})
  .then(response=>{if(!response.ok)throw new Error('Film unavailable');return response.blob();})
  .then(blob=>URL.createObjectURL(new Blob([blob],{type:'video/mp4'})))
  .catch(error=>{heroFilmResource=null;throw error;});
 return heroFilmResource;
}
const motionEnabled=()=>!userPaused&&!reduced.matches&&!!window.gsap&&!!window.ScrollTrigger;
let entranceFinished=!document.documentElement.classList.contains('entrance-loading');
let entranceLeaving=false,heroReady=false,prologueStarted=0,entranceDelay;
const loader=$('#mission-loader'),prologue=$('.mission-film');
const lockEntrance=locked=>{$$('body > nav,body > main,body > footer,body > .skip-link').forEach(el=>el.inert=locked);};
function revealEntrance(failed=false){
 if(entranceFinished||entranceLeaving)return;
 const remaining=prologueStarted?4600-(performance.now()-prologueStarted):0;
 if(!failed&&remaining>0){clearTimeout(entranceDelay);entranceDelay=setTimeout(()=>revealEntrance(),remaining);return;}
 entranceLeaving=true;clearTimeout(entranceTimeout);clearTimeout(entranceDelay);
 const hero=$('.hero-film');
 if(motionEnabled()&&scrollY<100)gsap.set('.intro-copy .split-word',{yPercent:105,opacity:0});
 // Both movies share the same orbit: align their frames before dissolving.
 if(hero?.readyState>=2&&prologue?.readyState>=2){
  try{hero.currentTime=Math.max(0,(prologue.currentTime-3)%6);}catch{}
  hero.play()?.catch(()=>{});
 }
 loader?.classList.add('is-departing');
 const finish=()=>{
  entranceFinished=true;loader?.remove();prologue?.pause();
  document.documentElement.classList.remove('entrance-loading');lockEntrance(false);lenis?.start();
  if(motionEnabled()&&scrollY<100)gsap.fromTo('.intro-copy .split-word',{yPercent:105,opacity:0},{yPercent:0,opacity:1,duration:1.15,stagger:.065,ease:'expo.out'});
  if(hero)films.get(hero)?.update(0);
 };
 setTimeout(finish,reduced.matches?0:1600);
}
const entranceTimeout=setTimeout(()=>revealEntrance(true),18000);
if(!entranceFinished&&prologue){
 lockEntrance(true);
 prologue.src='films/portfolio-prologue-hd.mp4';prologue.preload='auto';prologue.muted=true;
 const begin=()=>{
  if(prologueStarted||entranceLeaving)return;
  prologueStarted=performance.now();loader.classList.add('is-playing');
  prologue.play()?.catch(()=>{});
  if(heroReady)revealEntrance();
 };
 prologue.addEventListener('loadeddata',begin,{once:true});
 prologue.addEventListener('timeupdate',()=>{if(prologue.currentTime>=8.95)prologue.currentTime=3;});
 prologue.addEventListener('ended',()=>{prologue.currentTime=3;prologue.play()?.catch(()=>{});});
 prologue.addEventListener('error',()=>{loader.classList.add('is-playing');if(heroReady)revealEntrance(true);},{once:true});
 prologue.load();
}
async function filmEntranceReady(){
 await document.fonts?.ready;heroReady=true;
 if(prologueStarted||prologue?.error)revealEntrance();
}
const headlines={
 imprima:{es:'Una experiencia que invita a comprar.',en:'An experience built for shopping.'},
 innova:{es:'Cada conversación. Con continuidad.',en:'Every conversation. Connected.'},
 privatikaL:{es:'Una primera impresión. Que lo deja claro.',en:'A first impression. That makes it clear.'},
 privatika:{es:'La complejidad. Bajo control.',en:'Complexity. Under control.'},
 skyfleeter:{es:'Toda una operación. Conectada.',en:'An entire operation. Connected.'},
 muravi:{es:'Del inventario. A la decisión.',en:'From inventory. To decisions.'},
 salon:{es:'Cada reserva. En su lugar.',en:'Every booking. In its place.'},
 dentist:{es:'La atención continúa. Más allá de la cita.',en:'Care continues. Beyond the appointment.'}
};
const projectArt={
 imprima:{color:'#ffac87',glow:'201,85,40',shots:['imprima/screen-0.png','imprima/screen-2.png','imprima/screen-3.png'],es:'Cinco sitios. Experiencia, infraestructura y seguridad.',en:'Five websites. Experience, infrastructure and security.'},
 innova:{color:'#78e6ba',glow:'36,161,112',shots:['innova/screen-01.png','innova/screen-04.png','innova/screen-16.png'],es:'Conecté IA, conversaciones y atención humana.',en:'I connected AI, conversations and human support.'},
 privatikaL:{color:'#7bd5ed',glow:'35,142,187',shots:['24.jpg','26.jpg','28.jpg'],es:'Diseñé el primer contacto. Cuidé cada interacción.',en:'I designed the first contact. And every interaction.'},
 privatika:{color:'#9daeff',glow:'72,94,208',shots:['30.jpg','31.jpg','33.jpg'],es:'Convertí operaciones complejas en una experiencia clara.',en:'I turned complex operations into a clear experience.'},
 skyfleeter:{color:'#a4d4b1',glow:'53,130,83',es:'Conecté funciones web y móviles con la operación real.',en:'I connected web and mobile features to real operations.'},
 muravi:{color:'#c6a0ff',glow:'120,65,194',shots:['19.jpg','20.jpg','21.jpg'],es:'Conecté inventario, ventas y decisiones.',en:'I connected inventory, sales and decisions.'},
 salon:{color:'#f2b4c7',glow:'180,79,120',shots:['1.jpeg','3.jpeg','4.jpeg'],es:'Llevé los servicios y las reservas a una experiencia móvil.',en:'I brought services and bookings into a mobile experience.'},
 dentist:{color:'#8edcdd',glow:'28,143,152',shots:['11.jpeg','12.jpeg','13.jpeg'],es:'Conecté cada cita con lo que viene después.',en:'I connected each appointment with what comes next.'}
};
function renderProjects(){
 const root=$('#product-stories');if(!root)return;
 root.innerHTML=order.map(id=>{
  const n=caseNarratives[id],t=n[lang],art=projectArt[id];
  const media=id==='skyfleeter'?'<div class="fleet-scene" aria-label="'+text('Áreas de trabajo de Skyfleeter','Skyfleeter areas of work')+'"><span class="fleet-word">'+text('Vehículos','Vehicles')+'</span><span class="fleet-word">'+text('Conductores','Drivers')+'</span><span class="fleet-word">'+text('Viajes','Trips')+'</span></div>':'<div class="camera-reel">'+art.shots.map((src,i)=>'<figure class="camera-shot"><img src="images/'+src+'" loading="lazy" decoding="async" alt="'+t.title+' · '+text('Interfaz','Interface')+' '+(i+1)+'"></figure>').join('')+'</div>';
  return '<article class="product-story '+(projectsData[lang][id].isMobile?'is-mobile-product':'')+'" id="work-'+id+'" style="--project-accent:'+art.color+';--project-glow:'+art.glow+'"><div class="product-stage"><div class="project-atmosphere" aria-hidden="true"></div><div class="product-intro"><h3 class="product-name">'+t.title+'</h3><p class="product-headline split-title">'+headlines[id][lang]+'</p></div><div class="product-media">'+media+'</div><div class="product-insight"><p class="insight-text split-title">'+art[lang]+'</p>'+(id==='skyfleeter'?'<p class="confidential-note">'+text('Interfaces confidenciales. Conoce mi contribución.','Confidential interfaces. Discover my contribution.')+'</p>':'')+'<a class="text-link case-link" href="'+link(id)+'">'+text('Ver cómo lo abordé','See my approach')+'</a></div></div></article>';
 }).join('');
}
function renderProjectGallery(){
 if(!$('#proyectos'))return;
 $('#project-gallery-ui')?.remove();
 const ui=document.createElement('div');ui.id='project-gallery-ui';
 ui.innerHTML='<button class="projects-fab" aria-haspopup="dialog" aria-controls="projects-dialog" tabindex="-1">'+text('Ver todos los proyectos','View all projects')+'</button><dialog id="projects-dialog" class="projects-dialog" aria-labelledby="gallery-title" data-lenis-prevent><div class="projects-dialog-heading"><h2 id="gallery-title">'+text('Explora los proyectos.','Explore the projects.')+'</h2><button class="gallery-close">'+text('Cerrar','Close')+'</button></div><div class="projects-grid">'+order.map(id=>{
  const art=projectArt[id],title=caseNarratives[id][lang].title;
  return '<a class="project-card" href="'+link(id)+'" style="--project-accent:'+art.color+'"><div class="project-card-media '+(projectsData[lang][id].isMobile?'is-phone':'')+'">'+(art.shots?'<img src="images/'+art.shots[0]+'" alt="" loading="lazy">':'<span>Skyfleeter</span>')+'</div><h3>'+title+'</h3><p>'+text('Ver cómo lo abordé','See my approach')+'</p></a>';
 }).join('')+'</div></dialog>';
 document.body.append(ui);
}
function initProjectGallery(signal){
 const fab=$('.projects-fab'),dialog=$('#projects-dialog'),section=$('#proyectos');
 if(!fab)return;
 const sync=()=>{const r=section.getBoundingClientRect(),visible=r.top<innerHeight*.65&&r.bottom>innerHeight*.35;fab.classList.toggle('is-visible',visible);fab.tabIndex=visible?0:-1;fab.setAttribute('aria-hidden',String(!visible));};
 let queued=false;
 window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;if(!signal.aborted)sync();});}},{passive:true,signal});
 window.addEventListener('resize',sync,{signal});
 fab.addEventListener('click',()=>{lenis?.stop();dialog.showModal();dialog.scrollTop=0;},{signal});
 dialog.querySelector('.gallery-close').addEventListener('click',()=>dialog.close(),{signal});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}},{signal});
 dialog.addEventListener('close',()=>{lenis?.start();sync();},{signal});
 sync();
}
function renderImprimaDetails(){
 const captions=[['Portada y presentación comercial','Homepage and commercial presentation'],['Colecciones y navegación por categorías','Collections and category navigation'],['Ficha de producto, paquetes y carrito','Product details, bundles and cart'],['Campaña de temporada','Seasonal campaign'],['Catálogo, búsqueda y orden de productos','Catalogue, search and product sorting']];
 const sites=['imprimaenlinea.com','disenarte.com.sv','innovaciondigital.com.sv','imprimelotodo.com.sv','innovarte.com.sv'];
 return '<section class="case-chapter"><div class="case-chapter-copy"><h2>'+text('Un ecosistema de cinco sitios.','A five-website ecosystem.')+'</h2><p>'+text('Mi responsabilidad abarcó la experiencia de usuario, el monitoreo de servidores y medidas de ciberseguridad. Las imágenes de este caso corresponden a Imprimaenlinea.com.','My responsibility covered user experience, server monitoring and cybersecurity measures. The images in this case show Imprimaenlinea.com.')+'</p></div><div class="managed-sites">'+sites.map(site=>'<a href="https://'+site+'" target="_blank" rel="noopener">'+site+'</a>').join('')+'</div><div class="case-screens">'+captions.map((c,i)=>'<figure><a href="images/imprima/screen-'+i+'.png" target="_blank" rel="noopener"><img src="images/imprima/screen-'+i+'.png" loading="lazy" alt="'+c[lang==='es'?0:1]+'"></a><figcaption>'+c[lang==='es'?0:1]+'</figcaption></figure>').join('')+'</div></section>';
}
function renderInnovaDetails(){
 const sections=caseNarratives.innova.chapters;
 return '<div class="innova-case"><p class="privacy-note">'+text('Capturas de la plataforma con datos personales y contenido privado ocultos.','Platform screenshots with personal data and private content concealed.')+'</p>'+sections.map(section=>'<section class="case-chapter"><div class="case-chapter-copy"><h2>'+section[lang][0]+'</h2><div>'+section[lang].slice(1).map(p=>'<p>'+p+'</p>').join('')+'</div></div><div class="case-screens">'+section.screens.map(([i,es,en])=>'<figure><a href="images/innova/screen-'+String(i).padStart(2,'0')+'.png" target="_blank" rel="noopener" aria-label="'+text('Ampliar: ','Enlarge: ')+text(es,en)+'"><img src="images/innova/screen-'+String(i).padStart(2,'0')+'.png" loading="lazy" alt="'+text(es,en)+'"></a><figcaption>'+text(es,en)+'</figcaption></figure>').join('')+'</div></section>').join('')+'<section class="case-chapter-copy case-outcome"><h2>'+text('Lo que aporta a la operación.','What it brings to operations.')+'</h2><div><p>'+text('Un mismo lugar para atender, consultar el historial y supervisar la automatización. Las conversaciones pueden continuar entre el bot y el equipo con controles explícitos, y los reportes permiten identificar demanda, esperas y carga de atención.','One place to respond, review history and supervise automation. Conversations can move between the bot and the team with explicit controls, while reports reveal demand, waiting times and support workload.')+'</p><p>'+text('El trabajo continuó con mejoras de rendimiento: carga paginada del historial y límites de concurrencia y caché para adjuntos. La calidad del contexto y la interpretación de promociones sigue siendo un área de iteración; no se presenta como una capacidad infalible.','Further work focused on performance through paginated history and bounded attachment concurrency and caching. Context quality and promotion interpretation remain areas of iteration, not infallible capabilities.')+'</p></div></section></div>';
}
 function renderCase(){
  if(!$('#case-content'))return;
  const id=params.get('id')||order[0];
  if(!order.includes(id)||!caseNarratives[id]){$('#case-content').innerHTML='<h1 class="case-title split-title">'+text('Proyecto no encontrado','Project not found')+'</h1><a class="pill" href="index.html#proyectos">'+text('Explorar proyectos','Explore work')+'</a>';return;}
  const n=caseNarratives[id],d=projectsData[lang][id],t=n[lang];
  document.title=d.title+' — William Gutierrez';
  const chapters=[[text('El reto','The challenge'),t.challenge],[text('Cómo lo abordé','My approach'),t.approach],[text('La solución','The solution'),t.solution]];
  let html='<h1 class="case-title split-title">'+d.title+'</h1><p class="case-subtitle">'+t.subtitle+'</p><div class="case-meta"><div><span>'+text('Mi rol','My role')+'</span><p>'+d.role+'</p></div><div><span>'+text('Tecnologías','Technologies')+'</span><p>'+d.stack+'</p></div></div>';
  html+=chapters.map(c=>'<section class="case-story"><h2 class="split-title">'+c[0]+'</h2><p>'+c[1]+'</p></section>').join('');
  html+='<p class="case-focus">'+t.focus+'</p><section class="case-contributions"><h2 class="split-title">'+text('Contribuciones en detalle','Contributions in detail')+'</h2><div class="contributions-prose">'+d.activities.map(a=>'<p>'+a+'</p>').join('')+'</div></section>';
  if(id==='skyfleeter')html+='<section class="case-story"><h2 class="split-title">'+text('Sobre las capturas','About the screenshots')+'</h2><p>'+text('Por confidencialidad, las capturas no se publican aquí. Podemos conversar sobre las contribuciones durante una entrevista técnica.','Screenshots are not published here for confidentiality. We can discuss the contributions during a technical interview.')+'</p></section>';
  else if(id==='innova')html+=renderInnovaDetails();
  else if(id==='imprima')html+=renderImprimaDetails();
  else html+='<h2 class="gallery-heading">'+text('Dentro del producto','Inside the product')+'</h2><div class="gallery '+(d.isMobile?'mobile':'')+'">'+d.images.map((src,i)=>'<figure><img src="'+src+'" loading="lazy" decoding="async" alt="'+d.title+' · '+text('Pantalla','Screen')+' '+(i+1)+'"></figure>').join('')+'</div>';
  const next=order[(order.indexOf(id)+1)%order.length];
  html+='<a class="next-case" href="'+link(next)+'"><span>'+text('Siguiente proyecto','Next project')+'</span><span>'+projectsData[lang][next].title+' ↗</span></a>';
  html+='<a class="pill back-link return-bottom" href="index.html?lang='+lang+'&resume=1">'+text('Volver al recorrido','Back to the journey')+'</a>';
  $('#case-content').innerHTML=html;
  if(!$('.case-return-fab')){const a=document.createElement('a');a.className='pill back-link case-return-fab';document.body.append(a);}
  $$('.back-link').forEach(a=>{a.href='index.html?lang='+lang+'&resume=1';a.textContent=text('Volver al recorrido','Back to the journey');});
 }
function renderSkills(){
 const root=$('#technology-scenes');if(!root)return;
 const scenes=[
  {name:text('IA aplicada','Applied AI'),words:[text('Inteligencia artificial','Artificial intelligence'),'Vibe coding'],title:text('De la idea al producto. Con IA.','From idea to product. With AI.'),body:text('Combino desarrollo asistido por IA, criterio técnico y revisión del código para crear productos, asistentes y procesos conectados.','I combine AI-assisted development, technical judgment and code review to build products, assistants and connected processes.')},
  {name:text('Web & comercio','Web & commerce'),words:['Next.js','React','Vite','JavaScript','WordPress'],title:text('Experiencias que invitan a quedarse.','Experiences worth staying for.'),body:text('Interfaces, sitios administrables y tiendas online. Conecto diseño, navegación y datos para que cada interacción tenga sentido.','Interfaces, manageable websites and online stores. I connect design, navigation and data to make every interaction meaningful.')},
  {name:text('Desarrollo móvil','Mobile development'),words:['Kotlin','Swift','React Native'],title:text('Ideas que van contigo.','Ideas that go with you.'),body:text('Aplicaciones Android e interfaces para el ecosistema de Apple, con componentes reutilizables, notificaciones e integración de servicios.','Android applications and interfaces for the Apple ecosystem, with reusable components, notifications and integrated services.')},
  {name:text('Sistemas & datos','Systems & data'),words:['Odoo','.NET','Laravel'],title:text('Toda la operación. Conectada.','The whole operation. Connected.'),body:text('Ventas, compras, inventario y reportes. Adapto sistemas y lógica de negocio a los procesos reales de la empresa.','Sales, purchasing, inventory and reporting. I adapt systems and business logic to real business processes.')},
  {name:text('Automatización','Automation'),words:['n8n','Webhooks','APIs'],title:text('Menos tareas repetidas. Más posibilidades.','Fewer repetitive tasks. More possibilities.'),body:text('Diseño flujos que conectan herramientas, intercambian datos y hacen avanzar los procesos mediante reglas claras.','I design workflows that connect tools, exchange data and move processes forward through clear rules.')},
  {name:text('Conversaciones conectadas','Connected conversations'),words:['WhatsApp API'],title:text('La conversación también es parte del sistema.','The conversation is part of the system, too.'),body:text('Meta Cloud API, asistentes, cotizaciones y atención compartida. Conecto WhatsApp con los procesos y las personas que atienden cada solicitud.','Meta Cloud API, assistants, quotes and shared customer service. I connect WhatsApp with the processes and people handling each request.')}
 ];
 const logos={'Next.js':'nextdotjs','WordPress':'wordpress','Vite':'vite','JavaScript':'javascript','React':'react','React Native':'react','Kotlin':'kotlin','Swift':'swift','Odoo':'odoo','.NET':'dotnet','Laravel':'laravel','n8n':'n8n','WhatsApp API':'whatsapp'};
 Object.values(logos).forEach(name=>{const preload=new Image();preload.src='images/technology/'+name+'.svg';});
 const titles=lang==='es'?['Creo con IA.','Construyo experiencias.','Desarrollo en movimiento.','Doy forma a los datos.','Conecto procesos.','Abro conversaciones.']:['I create with AI.','I build experiences.','I develop on the move.','I give data structure.','I connect processes.','I open conversations.'];
 const descriptions={
  'Inteligencia artificial':['Asistentes y soluciones que conectan modelos con necesidades reales.','Assistants and solutions connecting models to real needs.'],
  'Artificial intelligence':['Asistentes y soluciones que conectan modelos con necesidades reales.','Assistants and solutions connecting models to real needs.'],
  'Vibe coding':['De la idea al prototipo con IA, criterio técnico y revisión de código.','From idea to prototype with AI, technical judgment and code review.'],
  'Next.js':['Experiencias web que conectan interfaces, navegación y datos.','Web experiences connecting interfaces, navigation and data.'],
  'WordPress':['Sitios administrables que el equipo puede mantener y hacer crecer.','Manageable websites teams can maintain and grow.'],
  'Vite':['Herramientas rápidas para desarrollar y construir experiencias web.','Fast tooling for developing and building web experiences.'],
  'React':['Interfaces interactivas construidas con componentes reutilizables.','Interactive interfaces built with reusable components.'],
  'JavaScript':['Interacciones y lógica que dan vida a la experiencia web.','Interactions and logic that bring web experiences to life.'],
  'Kotlin':['Aplicaciones Android con arquitectura y componentes reutilizables.','Android applications with architecture and reusable components.'],
  'Swift':['Interfaces y desarrollo para el ecosistema de Apple.','Interfaces and development for the Apple ecosystem.'],
  'React Native':['Experiencias móviles con componentes compartidos.','Mobile experiences built with shared components.'],
  'Odoo':['Procesos de ventas, compras, inventario y operación empresarial.','Sales, purchasing, inventory and business operations.'],
  '.NET':['Servicios y lógica de negocio para sistemas empresariales.','Services and business logic for enterprise systems.'],
  'Laravel':['Aplicaciones y servicios web conectados con los datos del negocio.','Web applications and services connected to business data.'],
  'n8n':['Flujos de automatización que conectan herramientas y personas.','Automation workflows connecting tools and people.'],
  'Webhooks':['Eventos que activan el siguiente paso de un proceso.','Events that trigger the next step in a process.'],
  'APIs':['Integraciones para que los sistemas intercambien información.','Integrations that let systems exchange information.'],
  'WhatsApp API':['Asistentes, atención compartida y procesos conectados con Meta Cloud API.','Assistants, shared customer service and processes connected through Meta Cloud API.']
 };
 root.innerHTML='<div class="eclipse-stage"><div class="eclipse-art" aria-hidden="true"><div class="eclipse-object"><img class="eclipse-base" src="images/eclipse.png" alt="" loading="lazy" decoding="async"><img class="eclipse-flare" src="images/eclipse-flare.png" alt="" loading="lazy" decoding="async"></div></div><div class="technology-emblem" aria-hidden="true"><img alt=""><span></span></div><div class="eclipse-chapters">'+scenes.map((scene,i)=>'<article class="technology-scene'+(i===0?' technology-ai':'')+'"><h3 class="technology-promise split-title">'+titles[i]+'</h3><div class="technology-names">'+scene.words.map(word=>'<button type="button" class="technology-word" aria-pressed="false" aria-describedby="technology-note-'+i+'" data-logo="'+(logos[word]||'')+'" data-word="'+escapeHTML(word)+'" data-detail="'+escapeHTML(descriptions[word][lang==='es'?0:1])+'"><span class="hover-label">'+word+'</span></button>').join('')+'</div><p class="technology-description" id="technology-note-'+i+'" data-default="'+escapeHTML(scene.body)+'">'+scene.body+'</p></article>').join('')+'</div></div>';
 root.querySelectorAll('.technology-scene').forEach(scene=>{
  const note=scene.querySelector('.technology-description');
  const activate=button=>{
   scene.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   note.textContent=button?button.dataset.detail:note.dataset.default;scene.classList.toggle('is-exploring',!!button);
   const flare=root.querySelector('.eclipse-flare'),emblem=root.querySelector('.technology-emblem');
   emblem.classList.toggle('is-visible',!!button);
   if(button){
    const image=emblem.querySelector('img'),label=emblem.querySelector('span');
    image.hidden=!button.dataset.logo;label.hidden=!!button.dataset.logo;
    if(button.dataset.logo)image.src='images/technology/'+button.dataset.logo+'.svg';
    else label.textContent=button.dataset.word==='Inteligencia artificial'?'IA':button.dataset.word==='Artificial intelligence'?'AI':button.dataset.word==='Vibe coding'?'Vibe':button.dataset.word;
    emblem.getAnimations().forEach(a=>a.cancel());
    if(motionEnabled())emblem.animate([{opacity:0,transform:'translateY(-50%) scale(.75)',filter:'blur(12px)'},{opacity:1,transform:'translateY(-50%) scale(1)',filter:'blur(0)'}],{duration:480,easing:'cubic-bezier(.22,1,.36,1)'});
   }
   hoverTween?.kill();hoverTween=null;
   root.classList.toggle('technology-hovering',!!button);
   if(button){
    const index=Array.from(scene.querySelectorAll('button')).indexOf(button);
    const target=[-115,-60,5,65][index%4];
    const orbit={angle:target-85};
    const place=()=>{const radians=orbit.angle*Math.PI/180;flare.style.left=(49.5+29*Math.cos(radians))+'%';flare.style.top=(48.4+29*Math.sin(radians))+'%';};
    if(motionEnabled()&&!document.body.classList.contains('keyboard-input')){
     place();hoverTween=gsap.to(orbit,{angle:target,duration:.85,ease:'power2.out',onUpdate:place});
     note.getAnimations().forEach(a=>a.cancel());note.animate([{opacity:.4,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'cubic-bezier(.23,1,.32,1)'});
    }else{orbit.angle=target;place();}
   }
   flare.classList.toggle('is-lit',!!button);
  };
  scene.querySelectorAll('button').forEach(button=>{
   button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate(button);});
   button.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&document.activeElement!==button)activate(null);});
   button.addEventListener('focus',()=>activate(button));
   button.addEventListener('blur',()=>activate(null));
   button.addEventListener('click',()=>activate(button));
  });
 });
}
// Split words without an external plugin; the full text remains available to assistive technology.
function splitWords(root=document){
 root.querySelectorAll('.split-title').forEach(el=>{
  if(el.dataset.split)return;
  const label=el.textContent.trim();el.setAttribute('aria-label',label);el.dataset.split='true';
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
   const frag=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{
    if(!word.trim()){frag.append(document.createTextNode(word));return;}
    const mask=document.createElement('span'),inner=document.createElement('span');mask.className='word-mask';mask.setAttribute('aria-hidden','true');inner.className='split-word';inner.textContent=word;mask.append(inner);frag.append(mask);
   });node.replaceWith(frag);
  });
 });
}
function unsplit(){
 $$('.split-title[data-split]').forEach(el=>{el.querySelectorAll('.word-mask').forEach(mask=>mask.replaceWith(document.createTextNode(mask.textContent)));delete el.dataset.split;el.removeAttribute('aria-label');});
}
function decorateArrows(){
 const names={'↗':'up-right','↘':'down-right','→':'right','←':'left','↑':'up','↓':'down'};
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode()){const n=walker.currentNode;if(/[↗↘→←↑↓]/.test(n.nodeValue)&&!n.parentElement.closest('script,style'))nodes.push(n);}
 nodes.forEach(n=>{const frag=document.createDocumentFragment();n.nodeValue.split(/([↗↘→←↑↓])/).forEach(t=>{if(names[t]){const icon=document.createElement('span');icon.className='icon icon-'+names[t];icon.ariaHidden='true';frag.append(icon);}else frag.append(document.createTextNode(t));});n.replaceWith(frag);});
}
function updateLanguage(){
 document.documentElement.lang=lang;
 $$('[data-es]').forEach(el=>el.textContent=el.dataset[lang]);
 $('#language').textContent=lang==='es'?'EN':'ES';$('#language').ariaLabel=lang==='es'?'Switch to English':'Cambiar a español';
 $$('a[href^="index.html"]').forEach(a=>{const u=new URL(a.getAttribute('href'),location.href);u.searchParams.set('lang',lang);a.href='index.html'+u.search+u.hash;});
 renderProjects();renderProjectGallery();renderCase();renderSkills();decorateArrows();
}
function updateMotionButton(){
 const paused=userPaused||reduced.matches;
 $('#motion-toggle').textContent=paused?text('Animar','Animate'):text('Pausar','Pause');
 $('#motion-toggle').setAttribute('aria-pressed',String(paused));
 $('#motion-toggle').ariaLabel=paused?text('Activar animaciones','Enable animations'):text('Pausar animaciones','Pause animations');
 $('#motion-toggle').title=reduced.matches?text('Movimiento reducido del sistema activo','System reduced motion is active'):'';
}
// One rendered take. Its first six seconds form the idle orbit; the same
// camera then travels inward. Never swap movies or restart the disk phase.
function prepareFilms(){
 const video=$('.hero-film');if(!video)return;
 const signal=events.signal,loopEnd=6;
 const state={time:0,target:0,phase:0,mode:'idle',playing:false,ready:video.readyState>=2};
 films.set(video,state);video.muted=true;
 const pause=()=>{state.playing=false;video.pause();};
 const seek=()=>{
  if(!state.ready||video.seeking||state.mode!=='scroll'||!motionEnabled())return;
  if(Math.abs(video.currentTime-state.target)>1/60){try{video.currentTime=state.target;}catch{}}
 };
 const play=()=>{
  if(state.playing||document.hidden||!motionEnabled()||!entranceFinished)return;
  if(video.currentTime>=loopEnd)video.currentTime=0;
  state.playing=true;video.play()?.catch(()=>{state.playing=false;});
 };
 state.update=time=>{
  state.time=time;
  if(!state.ready||!Number.isFinite(video.duration))return;
  if(time<=.015){state.mode='idle';play();return;}
  if(state.mode==='idle'){
   state.phase=Math.min(loopEnd,video.currentTime);state.mode='scroll';pause();
  }
  // Finish the current orbit phase while the cover text exits, then follow
  // the uninterrupted camera take. Both pieces meet at exactly frame 180.
  const target=time<.24
   ?state.phase+(loopEnd-state.phase)*Math.max(0,(time-.015)/.225)
   :loopEnd+(video.duration-.035-loopEnd)*Math.min(1,(time-.24)/1.42);
  state.target=Math.min(video.duration-.035,Math.max(0,target));seek();
 };
 const idleBoundary=()=>{
  if(state.mode==='idle'&&video.currentTime>=loopEnd&&!video.seeking){
   video.currentTime=video.currentTime%loopEnd;
  }
 };
 let frameCallback;
 if(video.requestVideoFrameCallback){
  const check=()=>{if(signal.aborted)return;idleBoundary();frameCallback=video.requestVideoFrameCallback(check);};
  frameCallback=video.requestVideoFrameCallback(check);
  signal.addEventListener('abort',()=>video.cancelVideoFrameCallback(frameCallback),{once:true});
 }else video.addEventListener('timeupdate',idleBoundary,{signal});
 video.addEventListener('loadeddata',()=>{state.ready=true;video.parentElement.classList.add('film-ready');filmEntranceReady();state.update(state.time);},{signal});
 video.addEventListener('seeked',seek,{signal});
 video.addEventListener('canplay',seek,{signal});
 video.addEventListener('error',()=>{video.parentElement.classList.remove('film-ready');pause();revealEntrance(true);},{signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else state.update(state.time);},{signal});
 if(!video.getAttribute('src')){
  loadHeroFilm(video.dataset.src).then(url=>{
   if(signal.aborted)return;
   video.src=url;video.preload='auto';video.load();
  }).catch(()=>{
   // Keep the same poster if media cannot be fetched; never hide page content.
   if(!signal.aborted){video.parentElement.classList.remove('film-ready');revealEntrance(true);}
  });
 }else state.update(0);
}
function saveJourneyPosition(){
 const anchor=captureReadingPosition(),dialog=$('#projects-dialog');
 const state={y:scrollY,id:anchor?.id,ratio:anchor?.ratio,gallery:!!dialog?.open,galleryY:dialog?.scrollTop||0};
 history.replaceState({...history.state,wgJourney:state},'');
 try{sessionStorage.setItem('wg-journey',JSON.stringify(state));}catch{}
}
function restoreJourneyPosition(fromCache=false){
 if(!document.body.classList.contains('home-page'))return false;
 const back=performance.getEntriesByType('navigation')[0]?.type==='back_forward';
 if(!fromCache&&!back&&!params.has('resume'))return false;
 let state=history.state?.wgJourney;
 if(params.has('resume')){try{state=JSON.parse(sessionStorage.getItem('wg-journey'))||state;}catch{}}
 if(!state)return false;
 let y=state.y;
 const el=state.id&&document.getElementById(state.id);
 if(el&&Number.isFinite(state.ratio))y=el.offsetTop+state.ratio*Math.max(1,el.offsetHeight-innerHeight);
 lenis?.start();if(lenis)lenis.scrollTo(y,{immediate:true,force:true});else scrollTo(0,y);
 window.ScrollTrigger?.update();
 window.ScrollTrigger?.getAll().forEach(st=>{if(st.vars.scrub&&st.animation){st.animation.progress(st.progress);st.getTween()?.progress?.(1);}});
 if(state.gallery){const dialog=$('#projects-dialog');if(dialog&&!dialog.open)dialog.showModal();if(dialog)dialog.scrollTop=state.galleryY;lenis?.stop();}
 window.dispatchEvent(new Event('scroll'));
 if(params.has('resume')){const u=new URL(location.href);u.searchParams.delete('resume');history.replaceState({...history.state,wgJourney:state},'',u);}
 return true;
}
function captureReadingPosition(){
 const els=$$('.intro,.product-story,#tecnologias,#enfoque,#sobre-mi,footer');
 const el=els.find(e=>{const r=e.getBoundingClientRect();return r.top<=100&&r.bottom>100;});
 return el?{el,ratio:(scrollY-el.offsetTop)/Math.max(1,el.offsetHeight-innerHeight),id:el.id,kind:el.classList.contains('intro')?'intro':null}:null;
}
function cleanup(){
 hoverTween?.kill();hoverTween=null;
 observer?.disconnect();observer=null;events?.abort();events=null;films.clear();
 mm?.revert();mm=null;ctx?.revert();ctx=null;
 if(lenis){lenis.destroy();lenis=null;}if(tick&&window.gsap)gsap.ticker.remove(tick);tick=null;
 $$('.scroll-film').forEach(v=>v.pause());
 document.body.classList.remove('motion-ready');unsplit();
}
function initMotion(first=false){
 updateMotionButton();document.body.classList.toggle('motion-off',!motionEnabled());
 events=new AbortController();const signal=events.signal;
 initProjectGallery(signal);
 if(!motionEnabled()){document.documentElement.classList.remove('motion-pending');return;}
 gsap.registerPlugin(ScrollTrigger);document.body.classList.add('motion-ready');splitWords();
 if(window.Lenis){lenis=new Lenis({duration:.9,smoothWheel:true,syncTouch:false});lenis.on('scroll',ScrollTrigger.update);tick=t=>lenis.raf(t*1000);gsap.ticker.add(tick);}
 prepareFilms();
 mm=gsap.matchMedia();
 mm.add({desktop:'(min-width: 900px) and (min-height: 600px)',compact:'(max-width: 899px), (max-height: 599px)'},context=>{
  const desktop=context.conditions.desktop;
  $$('.product-story').forEach(article=>{
   const stage=article.querySelector('.product-stage'),intro=article.querySelector('.product-intro'),media=article.querySelector('.product-media'),insight=article.querySelector('.product-insight'),video=article.querySelector('video');
   const timeline=gsap.timeline({scrollTrigger:{id:article.id,trigger:article,start:'top top',end:'bottom bottom',scrub:.3}});
   // One scroll clock controls the text, camera and cuts. Holds consume scroll,
   // so stopping anywhere leaves a sharp, inspectable interface on screen.
   const shots=Array.from(article.querySelectorAll('.camera-shot'));
   const phone=article.classList.contains('is-mobile-product');
   gsap.set(intro,{autoAlpha:0,y:0,scale:1});
   gsap.set(intro.querySelectorAll('.split-word'),{yPercent:108,opacity:0});
   gsap.set(media,{autoAlpha:0,scale:.94,yPercent:8,rotationX:5,xPercent:0});
   gsap.set(insight,{autoAlpha:0,y:28});
   gsap.set(insight.querySelectorAll('.split-word'),{yPercent:100,opacity:0});
   gsap.set(article.querySelector('.project-atmosphere'),{opacity:.3});
   timeline.to(intro,{autoAlpha:1,duration:.04},0)
    .to(intro.querySelectorAll('.split-word'),{yPercent:0,opacity:1,stagger:{amount:.04},duration:.10,ease:'power3.out'},0)
    .to(intro,{autoAlpha:0,y:-35,duration:.08,ease:'power2.in'},.20)
    .to(media,{autoAlpha:1,scale:1,yPercent:0,rotationX:0,duration:.14,ease:'power2.inOut'},.29)
    .to(article.querySelector('.project-atmosphere'),{opacity:1,duration:.3},.29)
    .to(media,{autoAlpha:0,scale:1.05,yPercent:-4,duration:.09,ease:'power2.inOut'},1.39)
    .to(insight,{autoAlpha:1,y:0,duration:.10},1.51)
    .to(insight.querySelectorAll('.split-word'),{yPercent:0,opacity:1,stagger:{amount:.05},duration:.12,ease:'power3.out'},1.51)
    .to(article.querySelector('.project-atmosphere'),{opacity:.25,duration:.15},1.51)
    .to({},{duration:.02},1.83);
   if(shots.length){
    shots.forEach((shot,i)=>{
     gsap.set(shot,{autoAlpha:i===0?1:(phone&&desktop&&i===1?.16:0),xPercent:i===0?0:(phone?105:9),scale:i===0?1:(phone?.80:1.04),rotationY:i===0?0:-6,zIndex:shots.length-i});
     gsap.set(shot.querySelector('img'),{scale:!desktop&&!phone?.52:1,transformOrigin:phone?'50% 35%':'50% 42%'});
    });
    [.59,1.00].forEach((at,i)=>{
     const outgoing=shots[i],incoming=shots[i+1];
     timeline.to(outgoing,{autoAlpha:phone&&desktop?.16:0,xPercent:phone?-105:-9,scale:phone?.80:1.04,rotationY:6,duration:.13,ease:'power2.inOut'},at)
      .set(incoming,{zIndex:5+i},at)
      .to(incoming,{autoAlpha:1,xPercent:0,scale:1,rotationY:0,duration:.13,ease:'power2.inOut'},at);
     if(i===0&&phone&&desktop)timeline.to(shots[2],{autoAlpha:.16,duration:.13},at);
     if(i===1)timeline.to(shots[0],{autoAlpha:0,duration:.10},at);
    });
    // The gentle push-in ends early, leaving an intentional still hold per shot.
    shots.forEach((shot,i)=>timeline.to(shot.querySelector('img'),{scale:phone?1.035:(desktop?1.075:1),duration:.16,ease:'power2.inOut'},[.43,.75,1.16][i]));
   }
   if(article.id==='work-skyfleeter'){
    timeline.fromTo(article.querySelectorAll('.fleet-word'),{xPercent:i=>(i%2?18:-18),opacity:.15},{xPercent:0,opacity:1,stagger:.12,duration:.28},.40);
   }
   // Blend the outgoing stage over the short handoff, before the next title enters.
   if(article.nextElementSibling)gsap.fromTo(stage,{autoAlpha:1},{autoAlpha:0,ease:'none',scrollTrigger:{trigger:article,start:'bottom bottom',end:'bottom 80%',scrub:true}});
   const caseLink=article.querySelector('.case-link');caseLink.addEventListener('focus',()=>{
    if(!document.body.classList.contains('keyboard-input'))return;const st=timeline.scrollTrigger;const target=st.start+(st.end-st.start)*.98;if(lenis)lenis.scrollTo(target,{immediate:true});else scrollTo(0,target);ScrollTrigger.update();st.getTween()?.progress?.(1);
   },{signal});
  });
  if($('.intro')){
   gsap.set('.hero-blackhole',{autoAlpha:1,clearProps:'transform'});
   gsap.set('.intro-copy',{autoAlpha:1,y:0});
   gsap.set('.intro-reveal-name',{autoAlpha:0,y:20});
   gsap.set('.intro-statement',{autoAlpha:0,y:25});
   gsap.set('.intro-statement .split-word',{yPercent:108,opacity:0});
   const introTimeline=gsap.timeline({onUpdate:()=>films.get($('.hero-film'))?.update(introTimeline.time()),scrollTrigger:{id:'intro-film',trigger:'.intro',start:'top top',end:'bottom bottom',scrub:.3}})
    .to('.intro-copy',{y:-40,autoAlpha:0,duration:.20},.08)
    .to('.intro-reveal-name',{autoAlpha:1,y:0,duration:.12},.32)
    .to('.intro-reveal-name',{autoAlpha:0,y:-15,duration:.12},.58)
    .to('.hero-blackhole',{autoAlpha:0,duration:.08},1.69)
    .to('.intro-statement',{autoAlpha:1,y:0,duration:.15},1.76)
    .to('.intro-statement .split-word',{yPercent:0,opacity:1,stagger:{amount:.045},duration:.12},1.76)
    .to({},{duration:.02},2.03);

  }
 });
 ctx=gsap.context(()=>{
  if(first&&entranceFinished&&$('.intro-copy'))gsap.from('.intro-copy .split-word',{yPercent:110,rotationX:-25,opacity:0,duration:.95,stagger:.07,ease:'expo.out'});
  $$('.section-intro .split-title,.approach .split-title,.about .split-title,footer .split-title,.language-section h3').forEach(el=>{
   gsap.from(el.querySelectorAll('.split-word'),{yPercent:90,opacity:0,rotationX:-25,stagger:{amount:.18},ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',end:'top 45%',scrub:.6}});
  });
  const tech=$('#technology-scenes');
  if(tech){
   const chapters=Array.from(tech.querySelectorAll('.technology-scene'));
   const art=tech.querySelector('.eclipse-art');
   gsap.set(chapters,{autoAlpha:0,y:35});
   gsap.set(art,{scale:.86,rotation:-20,xPercent:5});
   let visibleChapter=-1;
   const techTimeline=gsap.timeline({onUpdate:()=>{
    const next=Math.min(5,Math.floor(techTimeline.time()));
    if(next!==visibleChapter){visibleChapter=next;hoverTween?.kill();hoverTween=null;tech.classList.remove('technology-hovering');tech.querySelector('.technology-emblem').classList.remove('is-visible');tech.querySelector('.eclipse-flare').classList.remove('is-lit');chapters.forEach(ch=>{ch.classList.remove('is-exploring');ch.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));const note=ch.querySelector('.technology-description');note.textContent=note.dataset.default;});}
   },scrollTrigger:{id:'eclipse-technologies',trigger:tech,start:'top top',end:'bottom bottom',scrub:.25}});
   chapters.forEach((chapter,i)=>{
    const words=chapter.querySelectorAll('.split-word'),names=chapter.querySelectorAll('.technology-word');
    gsap.set(words,{yPercent:105,opacity:0});gsap.set(names,{y:24,opacity:0});
    techTimeline.to(chapter,{autoAlpha:1,y:0,duration:.12},i)
     .to(words,{yPercent:0,opacity:1,stagger:{amount:.045},duration:.14,ease:'power3.out'},i)
     .to(names,{y:0,opacity:1,stagger:{amount:.07},duration:.14,ease:'power3.out'},i+.12);
    if(i<chapters.length-1)techTimeline.to(chapter,{autoAlpha:0,y:-25,duration:.12,ease:'power2.inOut'},i+.86);
    chapter.querySelectorAll('button').forEach(button=>button.addEventListener('focus',()=>{
     if(!document.body.classList.contains('keyboard-input'))return;
     const st=techTimeline.scrollTrigger,target=st.start+(st.end-st.start)*(i+.5)/6;
     if(lenis)lenis.scrollTo(target,{immediate:true});else scrollTo(0,target);
     ScrollTrigger.update();st.getTween()?.progress?.(1);
    },{signal}));
   });
   techTimeline.to(art,{rotation:24,scale:1.17,xPercent:-7,duration:6,ease:'none'},0);
  }
  $$('.language-words>span').forEach(el=>gsap.from(el,{opacity:.15,y:26,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 65%',scrub:.4}}));
  $$('.case-story,.case-focus,.gallery figure').forEach(el=>gsap.from(el,{y:32,opacity:.15,duration:.65,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
  if($('.portrait img'))gsap.from('.portrait img',{scale:1.14,ease:'none',scrollTrigger:{trigger:'.portrait',start:'top bottom',end:'bottom top',scrub:.6}});
 });
 ScrollTrigger.refresh();
 document.documentElement.classList.remove('motion-pending');
}
function rebuild(change){
 const anchor=captureReadingPosition();cleanup();change?.();updateLanguage();initMotion();
 if(anchor){const el=anchor.id?document.getElementById(anchor.id):anchor.kind?$('.intro'):anchor.el;if(el?.isConnected){const y=el.offsetTop+Math.max(0,Math.min(1,anchor.ratio))*Math.max(0,el.offsetHeight-innerHeight);if(lenis)lenis.scrollTo(y,{immediate:true});else scrollTo(0,y);window.ScrollTrigger?.update();if(window.ScrollTrigger)ScrollTrigger.getAll().forEach(st=>{if(st.vars.scrub&&st.animation){st.animation.progress(st.progress);st.getTween()?.progress?.(1);}});}}
}
$('#language').addEventListener('click',()=>rebuild(()=>{lang=lang==='es'?'en':'es';const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState({},'',u);}));
$('#motion-toggle').addEventListener('click',()=>rebuild(()=>{userPaused=!userPaused;try{localStorage.setItem('wg-motion',userPaused?'paused':'full');}catch{}}));
reduced.addEventListener('change',()=>rebuild());
document.addEventListener('keydown',e=>{if(e.key==='Tab')document.body.classList.add('keyboard-input');});
document.addEventListener('pointerdown',()=>document.body.classList.remove('keyboard-input'));
document.addEventListener('click',e=>{
 const a=e.target.closest('a');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.hasAttribute('download')||a.target==='_blank')return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;
 if(document.body.classList.contains('home-page')&&u.pathname.endsWith('/proyecto.html'))saveJourneyPosition();
 if((u.pathname===location.pathname||u.pathname.endsWith('/index.html')&&location.pathname.endsWith('/'))&&u.hash){const el=document.getElementById(u.hash.slice(1));if(el){e.preventDefault();history.replaceState({},'',u);if(lenis&&e.detail!==0)lenis.scrollTo(el,{offset:0});else el.scrollIntoView({behavior:motionEnabled()&&e.detail!==0?'smooth':'instant'});}}
});
updateLanguage();initMotion(true);
if(!entranceFinished){lenis?.stop();if(!motionEnabled())revealEntrance();}else{$('#mission-loader')?.remove();clearTimeout(entranceTimeout);}
window.addEventListener('load',async()=>{await document.fonts?.ready;window.ScrollTrigger?.refresh();if(!restoreJourneyPosition()&&location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'});});
document.fonts?.ready.then(()=>window.ScrollTrigger?.refresh());
window.addEventListener('pageshow',e=>{if(e.persisted){window.ScrollTrigger?.refresh();restoreJourneyPosition(true);}});
})();
