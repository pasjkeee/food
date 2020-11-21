const   myTime = document.querySelectorAll('.timer__block'),
        endTime = new Date(),
        promTime = document.querySelector('.promotion__descr');
        endTime.setMonth(endTime.getMonth() + 1, 0);
        endTime.setHours(23, 59, 59, 999);
        console.log(endTime);
const myMenu = document.querySelector('.tabcontainer'),
      tabPhoto = myMenu.querySelectorAll('.tabcontent'),
      menuList = myMenu.querySelectorAll('.tabheader__item');
      console.log(tabPhoto[0]);
      function disable(tab) {
      tab.forEach( (exp)=> {
                exp.classList.add('hide');
                exp.classList.remove('show', 'fade');
      });}
      disable(tabPhoto);
      tabPhoto[0].classList.add('show');
      tabPhoto[0].classList.remove('hide');

     function removeCl (cl) {
        cl.forEach( (item)=> {
            item.classList.remove('tabheader__item_active');
        });
     }

     function setTab (ob1, ob2, str1, str2) {
        ob1.forEach(item => {
            if(item.firstElementChild.alt == str1 && ob2.innerHTML == str2) {
                disable(tabPhoto);
                item.classList.add('show', 'fade');
                item.classList.remove('hide');
            }
        });
     }

   menuList.forEach( (e, i)=> {
        e.addEventListener('click', (event)=> {
            event.preventDefault();
            removeCl(menuList);
            e.classList.toggle('tabheader__item_active');
            setTab(tabPhoto, e, "vegy", "Фитнес");
            setTab(tabPhoto, e, "elite", "Премиум");
            setTab(tabPhoto, e, "post", "Постное");
            setTab(tabPhoto, e, "ham", "Сбалансированное");
        });
   });
function setZero(obj){
    console.log(obj);
    if(obj<10)
    {
        obj='0'+ obj;
    }
    return String(obj);
}

let Days = '', Hours = '', Minutes = '', Seconds = '';
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
    myTime.forEach ( (e, i) => {
        e.firstElementChild.innerHTML = arr[i];
    });
}

setInterval (gettingTime, 999);
promTime.innerHTML = "";
promTime.innerHTML +=`Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях.`;
promTime.innerHTML +=`Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span>20%!</span>`;
promTime.innerHTML +=`<br><br> Акция закончится ${endTime.toLocaleString("ru")} `;