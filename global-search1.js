// Global Search Implementation for WhiteDavid23 Academy

const searchIndex = [
{
    title: "Home - EraServices",
    url: "index.html",
    description: "EraServices provides professional event management, wedding planning, birthday parties, corporate event production, interior design and home repair services across India.",
    keywords: [
        "EraServices",
        "event management services",
        "wedding planning",
        "corporate events",
        "birthday party planning",
        "home repair services",
        "interior design services"
    ]
},

{
    title: "Wedding Planning Services",
    url: "wedding.html",
    description: "Make your dream wedding a reality with our comprehensive wedding planning services. From intimate ceremonies to grand celebrations, we handle every detail with precision and creativity.",
    keywords: [
        "wedding planning",
        "marriage event planner",
        "wedding organizer",
        "wedding decoration",
        "destination wedding",
        "wedding management"
    ]
},

{
    title: "Corporate Event Production",
    url: "corporate.html",
    description: "Professional Corporate Event Production that enhances your brand image. From conferences to product launches, we deliver exceptional experiences that impress clients and motivate employees.",
    keywords: [
        "corporate events",
        "business conference",
        "product launch event",
        "corporate event planner",
        "company event management"
    ]
},

{
    title: "Birthday Party Planning",
    url: "birthday.html",
    description: "Create magical birthday celebrations with our creative party planning services. From kids' parties to milestone birthdays, we make every celebration special and memorable.",
    keywords: [
        "birthday party planner",
        "kids birthday party",
        "birthday decoration",
        "birthday event organizer",
        "birthday celebration services"
    ]
},

{
    title: "Plumbing Services",
    url: "plumbing.html",
    description: "Professional plumbing for all your residential and commercial needs. From installations to repairs, our expert team ensures your plumbing systems work flawlessly.",
    keywords: [
        "plumber service",
        "pipe repair",
        "water leakage repair",
        "bathroom plumbing",
        "kitchen plumbing",
        "home plumbing services"
    ]
},

{
    title: "Electronic Repair Services",
    url: "electronic.html",
    description: "Professional electronic repair for all your home appliances. From AC servicing to washing machine repairs, our expert technicians ensure reliable, efficient, and long-lasting performance.",
    keywords: [
        "AC repair",
        "washing machine repair",
        "home appliance repair",
        "electronics technician",
        "appliance servicing"
    ]
},

{
    title: "Chair Repair Services",
    url: "chair-repair.html",
    description: "Expert chair repair and restoration services for all types of chairs. From antique restoration to modern repairs, our skilled craftsmen bring your chairs back to life with precision and care.",
    keywords: [
        "chair repair",
        "furniture repair",
        "wood chair repair",
        "sofa chair repair",
        "chair restoration"
    ]
},

{
    title: "Chain Repair Services",
    url: "chain-repair.html",
    description: "Expert chain repair and replacement services for all types of chains. From pant chains to other zipper repairs, our skilled technicians ensure smooth and secure functionality.",
    keywords: [
        "chain repair",
        "pant chain repair",
        "zip repair",
        "zipper repair",
        "clothing chain repair"
    ]
},

{
    title: "Training & Educational Services",
    url: "education.html",
    description: "Transform learning experiences with our comprehensive training and course development services. From professional certification programs to skill development workshops, we deliver impactful learning solutions.",
    keywords: [
        "training programs",
        "skill development",
        "professional courses",
        "education services",
        "certification training"
    ]
},

{
    title: "Home Interior Designing",
    url: "home-interior-designing.html",
    description: "Transform your living spaces into beautiful, functional homes. Our expert designers create personalized interiors that reflect your style and enhance your lifestyle.",
    keywords: [
        "home interior design",
        "interior decorator",
        "room interior design",
        "home decoration",
        "modern interior design"
    ]
},

{
    title: "Bouncer Management",
    url: "bouncer.html",
    description: "Professional event security, verified access management, and VIP protection for premium events.",
    keywords: [
        "bouncer service",
        "event security",
        "VIP protection",
        "corporate security",
        "security staff"
    ]
}
];

function initGlobalSearch() {

const styleId = 'global-search-styles';

if (!document.getElementById(styleId)) {

const style = document.createElement('style');

style.id = styleId;

style.innerHTML = `

.search-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100vh;
background:rgba(2,6,23,0.85);
backdrop-filter:blur(12px);
z-index:999999;
display:flex;
align-items:flex-start;
justify-content:center;
padding-top:10vh;
opacity:0;
pointer-events:none;
transition:opacity .3s ease;
}

.search-overlay.active{
opacity:1;
pointer-events:all;
}

.search-container{
width:90%;
max-width:650px;
background:rgba(15,23,42,.95);
border:1px solid rgba(255,255,255,.1);
border-radius:16px;
box-shadow:0 25px 50px rgba(0,0,0,.5);
overflow:hidden;
transform:translateY(-20px) scale(.98);
transition:transform .3s ease;
}

.search-overlay.active .search-container{
transform:translateY(0) scale(1);
}

.search-header{
display:flex;
align-items:center;
padding:1rem 1.5rem;
border-bottom:1px solid rgba(255,255,255,.08);
}

.search-input{
flex:1;
background:transparent;
border:none;
color:#f8fafc;
font-size:1.15rem;
outline:none;
}

.search-input::placeholder{
color:#64748b;
}

.search-close-btn{
background:rgba(255,255,255,.05);
border:1px solid rgba(255,255,255,.1);
color:#94a3b8;
border-radius:6px;
width:32px;
height:32px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
margin-left:10px;
}

.search-results{
max-height:60vh;
overflow-y:auto;
padding:1rem 0;
}

.search-result-item{
display:block;
padding:1rem 1.5rem;
color:#e2e8f0;
text-decoration:none;
border-left:3px solid transparent;
transition:.2s;
}

.search-result-item:hover,
.search-result-item.selected{
background:rgba(59,130,246,.1);
border-left-color:#3b82f6;
}

.search-result-title{
font-weight:600;
font-size:1.05rem;
margin-bottom:4px;
color:#f8fafc;
}

.search-result-desc{
font-size:.85rem;
color:#94a3b8;
}

.search-empty{
padding:3rem 1.5rem;
text-align:center;
color:#64748b;
}

.highlight{
color:#60a5fa;
font-weight:700;
background:rgba(59,130,246,.15);
border-radius:2px;
padding:0 2px;
}

`;

document.head.appendChild(style);

}

if (!document.getElementById('global-search-overlay')) {

const overlay=document.createElement('div');

overlay.id='global-search-overlay';

overlay.className='search-overlay';

overlay.innerHTML=`

<div class="search-container">

<div class="search-header">

<input id="global-search-input" class="search-input" placeholder="Search services, events, repairs..." autocomplete="off">

<button id="global-search-close" class="search-close-btn">✕</button>

</div>

<div id="global-search-results" class="search-results">

<div class="search-empty">Type to start searching...</div>

</div>
</div>

`;

document.body.appendChild(overlay);

}

const overlay=document.getElementById('global-search-overlay');

const input=document.getElementById('global-search-input');

const closeBtn=document.getElementById('global-search-close');

const resultsContainer=document.getElementById('global-search-results');

let selectedIndex=-1;

let currentResults=[];

function escapeHTML(text){

return text.replace(/</g,"&lt;").replace(/>/g,"&gt;");

}

function highlightText(text,query){

if(!query)return escapeHTML(text);

const safe=escapeHTML(text);

const regex=new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');

return safe.replace(regex,'<span class="highlight">$1</span>');

}

function renderResults(query){

if(!query.trim()){

resultsContainer.innerHTML=`<div class="search-empty">Type to start searching...</div>`;

currentResults=[];

selectedIndex=-1;

return;

}

const q=query.toLowerCase();

currentResults=searchIndex

.map(item=>{

let score=0;

if(item.title.toLowerCase().includes(q))score+=3;

if(item.description.toLowerCase().includes(q))score+=2;

if((item.keywords||[]).some(k=>k.toLowerCase().includes(q)))score+=1;

return {...item,score};

})

.filter(i=>i.score>0)

.sort((a,b)=>b.score-a.score);

if(currentResults.length===0){

resultsContainer.innerHTML=`<div class="search-empty">No results found</div>`;

return;

}

let html='';

currentResults.forEach((item,index)=>{

html+=`

<a href="${item.url}" class="search-result-item" data-index="${index}">

<div class="search-result-title">

${highlightText(item.title,query)}

</div>

<div class="search-result-desc">

${highlightText(item.description,query)}

</div>

</a>

`;

});

resultsContainer.innerHTML=html;

}

function updateSelection(index){

const items=resultsContainer.querySelectorAll('.search-result-item');

items.forEach(el=>el.classList.remove('selected'));

if(index>=0&&index<items.length){

selectedIndex=index;

items[index].classList.add('selected');

items[index].scrollIntoView({block:'nearest'});

}else{

selectedIndex=-1;

}

}

window.openGlobalSearch=function(){

overlay.classList.add('active');

setTimeout(()=>input.focus(),50);

document.body.style.overflow='hidden';

};

window.closeGlobalSearch=function(){

overlay.classList.remove('active');

setTimeout(()=>{

input.value='';

renderResults('');

},300);

document.body.style.overflow='';

};

closeBtn.addEventListener('click',closeGlobalSearch);

overlay.addEventListener('click',e=>{

if(e.target===overlay)closeGlobalSearch();

});

input.addEventListener('input',e=>{

renderResults(e.target.value);

});

input.addEventListener('keydown',e=>{

const items=resultsContainer.querySelectorAll('.search-result-item');

if(e.key==="Escape")closeGlobalSearch();

if(e.key==="ArrowDown"){

e.preventDefault();

updateSelection(selectedIndex+1);

}

if(e.key==="ArrowUp"){

e.preventDefault();

updateSelection(selectedIndex-1);

}

if(e.key==="Enter"){

if(selectedIndex>=0&&items[selectedIndex]){

window.location.href=items[selectedIndex].href;

}

}

});

document.addEventListener('keydown',e=>{

if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){

e.preventDefault();

openGlobalSearch();

}

});

}

if(document.readyState==='loading'){

document.addEventListener('DOMContentLoaded',initGlobalSearch);

}else{

initGlobalSearch();

}