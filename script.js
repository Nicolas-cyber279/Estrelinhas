// starfield
(function(){
  const field=document.getElementById('starfield');
  let html='';
  for(let i=0;i<70;i++){
    const size=(Math.random()*1.8+1).toFixed(1);
    const top=(Math.random()*100).toFixed(2);
    const left=(Math.random()*100).toFixed(2);
    const dur=(Math.random()*3+2.5).toFixed(1);
    const delay=(Math.random()*4).toFixed(1);
    html+=`<span class="star-dot" style="width:${size}px;height:${size}px;top:${top}%;left:${left}%;--d:${dur}s;animation-delay:${delay}s"></span>`;
  }
  field.innerHTML=html;
})();

// cursor spotlight
const spot=document.getElementById('spot');
window.addEventListener('mousemove',e=>{
  spot.style.setProperty('--x', e.clientX+'px');
  spot.style.setProperty('--y', e.clientY+'px');
},{passive:true});

// scroll progress + parallax
const fill=document.getElementById('progressFill');
const planet=document.querySelector('.planet-wrap');
function onScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const pct=max>0?(window.scrollY/max)*100:0;
  fill.style.width=pct+'%';
  if(planet) planet.style.transform=`translateY(${window.scrollY*0.1}px)`;
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();