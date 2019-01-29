var imgs = [
    "1.JPG","2.JPG","3.JPG","4.JPG","5.JPG"
]
var showItemsCount =2; 
var fragments = []; 

var Counter = (function(){
    let totalItemsCount = imgs.length; 
    let currentIndex = 0; 
    let lastMoveToRight = true; 

    return { 
        getCurrent(){ 
            return currentIndex; 
        }, 
        add(){ 
            if(lastMoveToRight){ 
                currentIndex = currentIndex +1; 
            } 
            else{ 
                currentIndex = currentIndex + showItemsCount; 
            } 
                lastMoveToRight = true; 
        }, 
        minus(){ 
            if(lastMoveToRight){ 
                currentIndex = currentIndex - showItemsCount; 
            } 
            else{ 
                currentIndex = currentIndex -1; 
            } 
            lastMoveToRight = false; 
        } 
        ,set(index){ 
            currentIndex = index; 
        }, 
        imgIndex(index){ 
            if(index >= 0) 
                return index % totalItemsCount; 
            
            return totalItemsCount - (Math.abs(index)% totalItemsCount) -1 
        } 
    } 
})(); 
     
function ifSlideExist(slideId){ 
    var fragment = fragments.find((el, index, array)=> { 
    if(el.id == slideId) 
        return true; 
    }); 
    
    return fragment?true:false; 
} 

function render(){
    var currentIndex = Counter.getCurrent(); 
    var fragment= fragments.find((el, index, array)=> { 
            if(el.id == currentIndex) 
                return el; 
    }); 
        
    var slide = fragment.element.querySelector('.slide'); 
    slide.scrollIntoView({behavior: "smooth"}); 
}

function createSlide(slideId){ 
    const fragment = document.createElement('fragment'); 
    
    fragment.innerHTML += ` 
    <span class="slide"> 
        <img class="slide--img" src=${imgs[Counter.imgIndex(slideId)]}> 
    </span> 
    ` 
    
    let it = {id:slideId, element : fragment}; 
    fragments.push(it); 
    return fragment; 
} 


(function init(){
    const fragment = document.createElement('fragment'); 
    fragment.innerHTML = ` 
       
        <div class="buttons"> 
        <span> 
            <button type="button" id="btnLeft">&larr;</button> 
        </span> 
    ` 

    for(var i =0; i< imgs.length; i++){
        fragment.innerHTML += `
        <span>
            <button name="slidersButtons[]" value="${i}" type="button">&#x25CF;</button>
        </span>
        `;

    }

    fragment.innerHTML += ` 
        <span>
            <button type="button" id="btnRight">&rarr;</button>
        </span>
        </div>`;

    document.querySelector('body').appendChild(fragment);

    let container = document.querySelector('.main-container'); 

    Counter.set(0); 
    container.appendChild(createSlide(Counter.getCurrent())); 
    Counter.add(); 
    container.appendChild(createSlide(Counter.getCurrent())); 
    Counter.add(); 
    container.appendChild(createSlide(Counter.getCurrent())); 
    Counter.add(); 
    container.appendChild(createSlide(Counter.getCurrent())); 
    Counter.add(); 
    container.appendChild(createSlide(Counter.getCurrent())); 
    

    //toLeft 
    var btnl = document.getElementById("btnLeft"); 
    btnl.addEventListener('click', (e)=>{ 
        Counter.minus(); 
        var slideId = Counter.getCurrent(); 
        if(!ifSlideExist(slideId)){ 
            var slide = createSlide(slideId); 
            var container = document.querySelector('.main-container'); 
            container.insertBefore(slide, container.firstChild); 
        } 
        render(); 
        
    }); 


    //toRight 
    var btnr = document.getElementById('btnRight'); 
    btnr.addEventListener('click', (e)=>{ 
        Counter.add(); 
        var slideId = Counter.getCurrent(); 
        if(!ifSlideExist(slideId)){ 
            var slide = createSlide(slideId); 
            document.querySelector('.main-container').appendChild(slide); 
        } 
        render(); 
    }); 

// var btns = Array.from(document.querySelectorAll('[name="slidersButtons[]"]'));
// btns.forEach((btn)=>{ 
// btn.addEventListener('click', (e)=>{ 
// Counter.set(btn.value); 
// render(); 
// }); 

// }); 

})(); 

document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    var el = fragments[3];
    
    var slide = el.element.querySelector('.slide'); 
    slide.scrollIntoView({behavior: "smooth"}); 
    
});




