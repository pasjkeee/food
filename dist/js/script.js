//сonst { IgnorePlugin } = require("webpack");

window.addEventListener('DOMContentLoaded', function() {

const myTime = document.querySelectorAll('.timer__block'),
    endTime = new Date(),
    promTime = document.querySelector('.promotion__descr');
endTime.setMonth(endTime.getMonth() + 1, 0);
endTime.setHours(23, 59, 59, 999);
const myMenu = document.querySelector('.tabcontainer'),
    tabPhoto = myMenu.querySelectorAll('.tabcontent'),
    menuList = myMenu.querySelectorAll('.tabheader__item'),
    myButton = document.querySelectorAll('[data-model]'),

    modal = document.querySelector('.modal');
    //modalClose = modal.querySelector('.modal__close');

function disable(tab) {
    tab.forEach((exp) => {
        exp.classList.add('hide');
        exp.classList.remove('show', 'fade');
    });
}
disable(tabPhoto);
tabPhoto[0].classList.add('show');
tabPhoto[0].classList.remove('hide');

function removeCl(cl) {
    cl.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    });
}

menuList.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(i);
        removeCl(menuList);
        item.classList.toggle('tabheader__item_active');
        disable(tabPhoto);
        tabPhoto[i].classList.add('show', 'fade');
        tabPhoto[i].classList.remove('hide');
    });

});


function setZero(obj) {
    if (obj < 10) {
        obj = '0' + obj;
    }
    return String(obj);
}

let Days = '',
    Hours = '',
    Minutes = '',
    Seconds = '';

function gettingTime() {
    let startTime = new Date();
    Days = endTime.getDate() - startTime.getDate();
    Days = setZero(Days);
    Hours = endTime.getHours() - startTime.getHours();
    Hours = setZero(Hours);
    Minutes = endTime.getMinutes() - startTime.getMinutes();
    Minutes = setZero(Minutes);
    Seconds = endTime.getSeconds() - startTime.getSeconds();
    Seconds = setZero(Seconds);
    let arr = [Days, Hours, Minutes, Seconds];
    myTime.forEach((e, i) => {
        e.firstElementChild.innerHTML = arr[i];
    });
}

setInterval(gettingTime, 999);
promTime.innerHTML = "";
promTime.innerHTML += `Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях.`;
promTime.innerHTML += `Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span>20%!</span>`;
promTime.innerHTML += `<br><br> Акция закончится ${endTime.toLocaleString("ru")} `;


function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hide";
}
myButton.forEach((e) => {
    e.addEventListener('click', () => {
        if (e.dataset.model == "btnOpen") {
            openModal();
        }
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (eve) => {
        if (eve.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
});

const docH = document.documentElement.scrollHeight;

function crollClose() {
    let myH = document.documentElement.scrollTop;
    const winH = window.innerHeight;
    if (docH - myH < winH) {
        openModal();
        window.removeEventListener('scroll', crollClose);
    }
}

const meEv = window.addEventListener('scroll', crollClose);

const menuListss = document.querySelector('.menu__field');
const menuLists = menuListss.querySelector('.container');
const menuPrice = menuListss.querySelectorAll('.menu__item-price');
console.log(menuLists);

class menuT {
    constructor( menuTitle, menuText, menuPhoto, menuPrice, ...classes) {
        this.menuTitle = menuTitle;
        this.menuText = menuText;
        this.menuPhoto = menuPhoto;
        this.menuPrice = menuPrice;
        this.classes = classes;
    }

    isertTitle() {
       const element = document.createElement('div');
       if(this.classes.length === 0) {
         element.classList.add("menu__item");
       } else {
           this.classes.forEach ( e => element.classList.add(e) );
       }
       element.insertAdjacentHTML('beforeend', `
       <img src="${this.menuPhoto}" alt="vegy">
       <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
       <div class="menu__item-descr">${this.menuText}</div>
       <div class="menu__item-divider"></div>
       <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${this.menuPrice}</span> грн/день</div>
       </div>`);
        menuLists.append(element);
    }
}

new menuT("Даня привет", "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", "img/tabs/elite.jpg", "228", "menu__item").isertTitle();
  


//Forms

const forms = document.querySelectorAll('form'); //все формы в проекте

const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'ЧТо-то пошло не так..'
};

forms.forEach(item => {  //для каждой формы применяем функцию отправки
    postData(item);
});

// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const statusMessage = document.createElement('div');
//         statusMessage.classList.add('status');
//         statusMessage.textContent = message.loading;
//         form.appendChild(statusMessage);

//         const request = new XMLHttpRequest();
//         request.open('POST', 'server.php');

//        // request.setRequestHeader('Content-type', 'multipart/form-data'); Не надо так
//         const formData = new FormData(form);

//         request.send(formData);

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 console.log(request.response);
//                 statusMessage.textContent = message.success;
//                 form.reset();
//                 setTimeout( (() => statusMessage.remove()), 2000);
//             } else { statusMessage.textContent = message.failure; }
//         });
//     });
// }

function postData(form) {
    form.addEventListener('submit', (e) => {     //при дейтсвии submit
        e.preventDefault();

        let statusMessage = document.createElement('img'); //создаём элемент
        statusMessage.src = message.loading; //добавим класс статус
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `; 
        form.insertAdjacentElement('beforeend', statusMessage); //загружаем в нашу форму этот див

        const formData = new FormData(form); //создаём форму
        const object = {};
        formData.forEach(function (value, key) { //для каждого элемента formData записываем его в объект
            object[key] = value;
        }); //создаём объект

        fetch('se3rver.php', {
                method: "POST",
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => {
                return new Promise ( (resolve, reject) => {
                const r = response.status;
                if(r < 200 || r > 399) {
                    reject();
                }
                console.log(r);
                resolve(r);
              });
            })
            .then(json => {
                console.log("Showing good");
                showThanksModal(message.success);
                statusMessage.remove();
                return(console.log(json));
            })
            .catch( () => {
                     showThanksModal(message.failure);
                     statusMessage.remove();
                });
    });
}

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close >&times;</div>
                <div class="modal__title" >${message}</div>
            </div>
            `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout( () => {
            thanksModal.remove(); 
            prevModalDialog.classList.add('show');  
            prevModalDialog.classList.remove('hide');  
            closeModal();}, 4000);
    }
 });