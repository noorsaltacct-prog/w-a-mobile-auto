const FORM_ENDPOINT = "[FORM_ENDPOINT]";
const GALLERY_IMAGES = [
  {src:"gallery/photo-1.jpg", alt:"W-A Mobile Mechanic working on a vehicle suspension area"},
  {src:"gallery/photo-2.jpg", alt:"Close-up of an engine bay during mobile mechanic service"},
  {src:"gallery/photo-3.jpg", alt:"Pickup truck receiving mobile mechanical service"},
  {src:"gallery/photo-4.jpg", alt:"W-A Mobile Mechanic work photo 4"},
  {src:"gallery/photo-5.jpg", alt:"W-A Mobile Mechanic work photo 5"},
  {src:"gallery/photo-6.jpg", alt:"W-A Mobile Mechanic work photo 6"},
  {src:"gallery/photo-7.jpg", alt:"W-A Mobile Mechanic work photo 7"},
  {src:"gallery/photo-8.jpg", alt:"W-A Mobile Mechanic work photo 8"}
];

const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$("#header");
addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>18),{passive:true});
const menuBtn=$(".menu-btn"), menu=$(".mobile-menu");
function setMenu(open){menuBtn.setAttribute("aria-expanded",open);menu.classList.toggle("open",open);menu.setAttribute("aria-hidden",!open);document.body.classList.toggle("lock",open)}
menuBtn.addEventListener("click",()=>setMenu(menuBtn.getAttribute("aria-expanded")!=="true"));
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%3,2)*45}ms`;io.observe(el)});

const counter=$(".count");
if(counter){
  const cio=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return; const end=+counter.dataset.count, start=performance.now(), dur=650;
    function tick(now){const p=Math.min((now-start)/dur,1),v=Math.round(end*(1-Math.pow(1-p,3)));counter.textContent=(counter.dataset.prefix||"")+v;if(p<1)requestAnimationFrame(tick)}
    requestAnimationFrame(tick);cio.disconnect();
  });cio.observe(counter);
}

const icons={
scan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 12h2l1.5-3 3 6 1.5-3H18"/></svg>',
disc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v3M20 12h-3M12 20v-3M4 12h3"/></svg>',
oil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 14l3-7h8l3 7v4H4zM7 7V4h5M18 9h3v5"/><path d="M19 17c0 1.7 2 2.7 2 0 0-1-1-2-1-2s-1 1-1 2z"/></svg>',
spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3l-4 7h4l-4 11 9-12h-5z"/></svg>',
temp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 5a2 2 0 014 0v8.2a4 4 0 11-4 0z"/><path d="M12 8v7"/></svg>',
fuel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 20V5h9v15M5 9h9M14 8h3l2 3v6a2 2 0 004 0v-6l-2-2"/></svg>',
gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2.3-1.7.7-1.9-.9-2.1 2.1.9 1.9-.7 1.7L-1 10.5v3l2.3.7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2.3h3l.7-2.3 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7z" transform="translate(2 0) scale(.83)"/></svg>',
steer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M4 10h16M12 14v7M10.5 13L6 18M13.5 13l4.5 5"/></svg>',
battery:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V4h3v3M15 7V4h3v3M7 13h4M9 11v4M15 13h3"/></svg>'
};
$$("[data-icon]").forEach(el=>el.innerHTML=icons[el.dataset.icon]||icons.gear);

const track=$("#galleryTrack"), dots=$("#galleryDots");
let current=0, validImages=[];
GALLERY_IMAGES.forEach((item,i)=>{
  const b=document.createElement("button");b.className="gallery-item";b.type="button";b.dataset.index=i;b.setAttribute("aria-label",`Open gallery image ${i+1}`);
  const img=document.createElement("img");img.src=item.src;img.alt=item.alt;img.loading=i<2?"eager":"lazy";img.decoding="async";
  img.onerror=()=>{b.classList.add("fallback");b.innerHTML="<span>Real work photo coming soon</span>"};
  b.appendChild(img);track.appendChild(b);
  const d=document.createElement("button");d.className="dot"+(i===0?" active":"");d.setAttribute("aria-label",`Go to image ${i+1}`);d.addEventListener("click",()=>scrollGallery(i));dots.appendChild(d);
});
function scrollGallery(i){const items=$$(".gallery-item",track);if(items[i])items[i].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})}
$("#prevGallery").onclick=()=>scrollGallery(Math.max(0,current-1));$("#nextGallery").onclick=()=>scrollGallery(Math.min(GALLERY_IMAGES.length-1,current+1));
track.addEventListener("scroll",()=>{const items=$$(".gallery-item",track),left=track.scrollLeft;let best=0,dist=Infinity;items.forEach((el,i)=>{const d=Math.abs(el.offsetLeft-left);if(d<dist){dist=d;best=i}});current=best;$$(".dot",dots).forEach((d,i)=>d.classList.toggle("active",i===current))},{passive:true});

const lb=$("#lightbox"), lbImg=$("#lightboxImg");let lbIndex=0,lastFocus=null;
function openLb(i){const img=$$(".gallery-item img",track)[i];if(!img)return;lbIndex=i;lastFocus=document.activeElement;lbImg.src=img.src;lbImg.alt=img.alt;lb.classList.add("open");lb.setAttribute("aria-hidden","false");document.body.classList.add("lock");$(".lightbox-close").focus()}
function closeLb(){lb.classList.remove("open");lb.setAttribute("aria-hidden","true");document.body.classList.remove("lock");lastFocus?.focus()}
function stepLb(n){const imgs=$$(".gallery-item img",track);if(!imgs.length)return;lbIndex=(lbIndex+n+imgs.length)%imgs.length;lbImg.src=imgs[lbIndex].src;lbImg.alt=imgs[lbIndex].alt}
track.addEventListener("click",e=>{const b=e.target.closest(".gallery-item");if(b&&!b.classList.contains("fallback"))openLb(+b.dataset.index)});
$(".lightbox-close").onclick=closeLb;$(".lightbox-prev").onclick=()=>stepLb(-1);$(".lightbox-next").onclick=()=>stepLb(1);
addEventListener("keydown",e=>{if(!lb.classList.contains("open"))return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")stepLb(-1);if(e.key==="ArrowRight")stepLb(1);if(e.key==="Tab"){const f=$$("button",lb),first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
let touchX=0;lb.addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});lb.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45)stepLb(dx<0?1:-1)},{passive:true});

$$("[data-service]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>{$("#service").value=a.dataset.service},250)));
const form=$("#quoteForm"), status=$(".form-status");
form.addEventListener("submit",async e=>{e.preventDefault();if(!form.reportValidity())return;status.textContent="Sending…";const data=new FormData(form);
  if(!FORM_ENDPOINT||FORM_ENDPOINT.startsWith("[")){status.textContent="Form endpoint not set. Opening your email app instead.";const subject=encodeURIComponent("W-A Mobile Mechanic quote request");const body=encodeURIComponent([...data].map(([k,v])=>`${k}: ${v}`).join("\n"));location.href=`mailto:[EMAIL]?subject=${subject}&body=${body}`;return}
  try{const r=await fetch(FORM_ENDPOINT,{method:"POST",body:data,headers:{Accept:"application/json"}});if(!r.ok)throw 0;form.reset();status.textContent="Thanks — your request was sent."}catch{status.textContent="Couldn’t send. Please call or text 281-300-2809."}
});
$("#year").textContent=new Date().getFullYear();
