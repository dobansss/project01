

//Tab

document.addEventListener('DOMContentLoaded', () => {


const tabContent = document.querySelectorAll('.tabcontent'),
    tabitem = document.querySelectorAll('.tabheader__item'),
   tabsparent = document.querySelector('.tabheader__items');




function hideContent() {
    tabContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show','fade');
    });
    tabitem.forEach(item => item.classList.remove('tabheader__item_active'));
}

function showContent(i = 0) {
    tabContent[i].classList.add('show','fade');
    tabContent[i].classList.remove('hide');
    tabitem[i].classList.add('tabheader__item_active');
}

hideContent();
showContent();

tabsparent.addEventListener('click', (e) =>{

    if(e.target && e.target.classList.contains('tabheader__item')){

        tabitem.forEach((item,i) =>{

            if(e.target === item ){
                hideContent();
                showContent(i);
            }

        });
    }
});



//Timer

const deadline = '2021-08-28';

function gettimeRemaning(endtime) {

    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours  = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t/ 1000 / 60) % 60),
         seconds =  Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'second': seconds
    };

}


function getZero(num) {
    if (num >= 0 && num < 10){
        return `0${num}`;

    } else {
        return  num;
    }
}


function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hors = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(upDateclock,1000);
 upDateclock();
    function upDateclock() {
        const t = gettimeRemaning(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.second);

        if(t.total <= 0){
            clearInterval(timeInterval);
        }
    }

}

setClock('.timer',deadline);


//Modal


const btnmodal = document.querySelectorAll('button'),
    modal = document.querySelector('.modal'),
    btnModalclose = document.querySelector('.modal__close');

function showModal() {
modal.classList.add('show');
modal.classList.remove('hide');
document.body.style.overflow ='hidden';
// clearInterval(timerId);
}

function hideModal() {
modal.classList.add('hide');
modal.classList.remove('show');
document.body.style.overflow ='';
}

btnmodal.forEach(btn =>{
    btn.addEventListener('click',showModal);
});
btnModalclose.addEventListener('click',hideModal);

modal.addEventListener('click', (event) =>{
    if(event.target === modal || event.target.getAttribute('data-close') ==''){
        hideModal();
    }
});

document.addEventListener('keydown',(e) =>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
        hideModal();
    }
});

// const timerId = setTimeout(showModal,3000);

window.addEventListener('scroll',() =>{
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ){
   showModal();
    }
});



//Class Cards


class MenuCard {
    constructor(src,alt,title,descrs,price,parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descrs = descrs;
      this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 2;
        this.changetodolars();
    }
    changetodolars(){
        this.price = this.price * this.transfer;
    }
    render (){
        const div = document.createElement('div');

        if(this.classes.length === 0){
            this.div = 'menu__item'
            div.classList.add(this.div);

        } else {
            this.classes.forEach(className => div.classList.add(className));

        }



        div.innerHTML = `
                    <img src= ${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descrs}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
        `;
        this.parent.append(div);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "вежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    "100",
    '.menu__field .container ',
    // "menu__item",
    // "big"
).render();

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "вежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    "100",
    '.menu__field .container ',
    // 'menu__item',
    // 'small'
).render();

//Server

const forms = document.querySelectorAll('form');

forms.forEach(form =>{
    postData(form);
});


const message = {
    loading:'img/form/spinner.svg',
    succes: 'succes',
    fail: 'fail'
}


function postData(form) {
    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const thanksmessage = document.createElement('img');
       thanksmessage.src = message.loading;
     thanksmessage.style.cssText = `
          display: block,
          margin: 0 auto;
     `;
       form.append(thanksmessage);

        const formData = new FormData(form);
        const object = {};

        formData.forEach(function (value,key) {
            object[key] = value;
        });

        // const json = JSON.stringify(object);

        fetch("server.php",{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(data => data.text())
            .then(data =>{
                console.log(data);
                showThanksModal(message.succes);
            })
            .catch(() =>{
                showThanksModal(message.fail);
            })
            .finally(() =>{
                form.reset();
            })


    });
}

//modal modif

function showThanksModal(message) {
    const previosmodal = document.querySelector('.modal__dialog');
    previosmodal.classList.add('hide');

    showModal();

    const newthanksmodal = document.createElement('div');
    newthanksmodal.classList.add('modal__dialog');

    newthanksmodal.innerHTML =`
    
      <div class="modal__content">
                    <div class="modal__close" data-close >x</div>
                    <div class="modal__title">${message}</div>
            </div>
     `;
document.querySelector('.modal').append(newthanksmodal);
setTimeout(()=>{
    newthanksmodal.classList.add('hide');
    previosmodal.classList.add('show');
    previosmodal.classList.remove('hide');
},4000);
}


fetch('db.json')
.then(data => data.json())
.then(res => console.log(res));

//API aplicaton progrmaming interface
//DOM API

// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method: "POST",
//     body: JSON.stringify({name: 'alex'}),
//     headers:{
//         'Content-type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json));

});