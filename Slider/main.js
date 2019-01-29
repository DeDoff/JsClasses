var imgs = [
    "1.JPG","2.JPG","3.JPG","4.JPG","5.JPG"
]



var Counter = (function(){
    var totalItemsCount = imgs.length;
    var currentIndex = 0;

    return {
        getCurrent(){
            return currentIndex;
        },

        next(){
            return (currentIndex + 1) % totalItemsCount;
        },
        previous(){
            let i = currentIndex -1;
            if(i < 0){
                i = totalItemsCount + i;
            }
            return i % totalItemsCount;
        },
        add(){
            let i = currentIndex +1;
            currentIndex = i %totalItemsCount;
            return currentIndex;
        },
        minus(){
            let i = currentIndex -1;
            if(i < 0){
                i = totalItemsCount + i;
            }
            currentIndex = i %totalItemsCount;
            return currentIndex;
        }
        ,set(index){
            if(index < 0){
                index = Math.abs(index);
            }
            currentIndex = index  % totalItemsCount;
        }


    }
})();

function render(){
    let image = getImgElement('#mainSlide');
    let leftimage = getImgElement('#leftSlide');
    let rightimage = getImgElement('#rightSlide');
    image.src = imgs[Counter.getCurrent()];
    leftimage.src = imgs[Counter.previous()];
    rightimage.src = imgs[Counter.next()];

    // leftimage.style.display = "none";
    // rightimage.style.display = "none";
}

function getImgElement(id){
    let retElement = null;
    document.querySelector(id).childNodes
    .forEach(element => {
        if(element instanceof HTMLImageElement)
            retElement= element;
    });
    return retElement;
}


(function init(){
    const fragment = document.createElement('fragment');
    fragment.innerHTML = `
            <div class="main-container">
                <span class="slide" id="leftSlide">
                    <img class="slide--img">
                </span>
                <span class="slide" id="mainSlide">
                    <img class="slide--img">
                    </span>
                <span class="slide" id="rightSlide">
                    <img class="slide--img">
                </span>
            </div>

            <div style="display:inline;">
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

    let image = getImgElement('#mainSlide');
    image.style.border = '5px solid red';
    image.classList.add('slide__active__img');

    var btnl = document.getElementById("btnLeft");  

    btnl.addEventListener('click', (e)=>{
        Counter.minus();
        render();
    });

    var btnr = document.getElementById('btnRight');
    btnr.addEventListener('click', (e)=>{
        Counter.add();
        render();
    });

    var btns =  Array.from(document.querySelectorAll('[name="slidersButtons[]"]'));
    btns.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            Counter.set(btn.value);
            render();
        });
    
    });



    render();
})();





