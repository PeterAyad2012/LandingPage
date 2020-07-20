
const sections = document.getElementsByTagName("section");
const navList = document.getElementById("navList");

//building navbar function
function buildNav(sec, menuContainer){
    const fragment = document.createDocumentFragment();
    for(let i=1; i<=sec.length; i++){
        const element = document.createElement('li');
        const id = "element"+i;
        element.setAttribute("id",id);
        element.classList.add('navElement');
        element.innerHTML = "<a class='item' href='#" + sections[i-1].id + "'>Sec" + i + "</a>";
        fragment.appendChild(element);
    }

    menuContainer.appendChild(fragment);
}

//scroll to function
function scrollLink(){
    event.preventDefault();
    const h = this.href.split('#')[1];
    const pos = document.getElementById(h).offsetTop;
    window.scrollTo(0,pos);
}

//Active function
function addActiv(){
    const scrollCurrent = document.documentElement.scrollTop;
    const navElements = document.getElementsByClassName("navElement");
    
    for(let i=1 ; i<=sections.length ; i++){
        const thisSecPosition = sections[i-1].offsetTop;
        const thisSecHeight = sections[i-1].offsetHeight;
        if(scrollCurrent>=thisSecPosition && thisSecPosition<thisSecPosition+thisSecHeight){
            for(let j=0 ; j<navElements.length ; j++){
                navElements[j].classList.remove("pressed");
                sections[j].classList.remove("current");
            }
            
            const elementid = "element"+i;
            document.getElementById(elementid).classList.add("pressed");
            sections[i-1].classList.add("current");
        }
    }
}

//take care of hover on touch devices
function checkHov(){
    let lastTouchTime = 0;
    
    //remove hover function
    function disableHover() {
        document.body.classList.remove('hasHov');
    }

    //enable hover function
    function enableHover() {
        if (new Date() - lastTouchTime < 500) {return;}
        document.body.classList.add('hasHov');
    }
    
    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }
    
    //remove hover for touch devices
    document.addEventListener('touchstart', updateLastTouchTime);
    document.addEventListener('touchstart', disableHover);

    //enable hover for mouse event
    document.addEventListener('mousemove', enableHover);
}

//building navbar
buildNav(sections, navList);

//scroll on link click
const items = document.getElementsByClassName("item");
for(let item=0 ; item<items.length ; item++){
    items[item].addEventListener("click", scrollLink);
}

//set active on scroll
document.addEventListener("scroll", addActiv);

//check touch device for hover
checkHov();