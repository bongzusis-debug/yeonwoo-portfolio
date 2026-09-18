function projectCard(p,index,featured=false){
 const [name,type,contribution,description,image,url]=p;
 const article=document.createElement('article');article.className='project reveal';
 article.innerHTML=`<${url?'a':'div'} class="project-art" ${url?`href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name} 작업물 새 탭에서 보기"`:''}><span class="project-number">${String(index+1).padStart(2,'0')}</span><img src="assets/${image}" alt="${name} 작업 화면" loading="lazy" width="349" height="402">${url?'<span class="view-project" aria-hidden="true">VIEW ↗</span>':''}</${url?'a':'div'}><div class="project-meta"><span>${type}</span><span>기여도 ${contribution}%</span></div><h3>${name}</h3><p>${description}</p>${url?`<a class="project-link" href="${url}" target="_blank" rel="noopener noreferrer">작업물 보기 ↗</a>`:''}`;
 return article;
}
[0,5,4,7,9,6].forEach(i=>document.querySelector('#featured').append(projectCard(projects[i],i,true)));
projects.forEach((p,i)=>document.querySelector('#archive-grid').append(projectCard(p,i)));
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
const targets=document.querySelectorAll('.project,.section-heading,.about-intro,.timeline article,.skill-grid article,.ai-panel,.education');
let observer;
function enableReveal(){if(observer)observer.disconnect();if(motionQuery.matches){targets.forEach(el=>el.classList.add('visible'));return;}observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:0.08});targets.forEach(el=>{el.classList.add('reveal');observer.observe(el)});}
enableReveal();motionQuery.addEventListener('change',enableReveal);
let ticking=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform=`scaleX(${max?scrollY/max:0})`;if(!motionQuery.matches&&!document.body.classList.contains('motion-paused')){document.querySelector('.hero-watermark').style.transform=`translateX(${-Math.min(scrollY*.14,160)}px)`;}ticking=false;}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
document.querySelector('.motion-control').addEventListener('click',function(){const paused=document.body.classList.toggle('motion-paused');this.setAttribute('aria-pressed',String(paused));this.textContent=paused?'모션 재생':'모션 일시정지';});
