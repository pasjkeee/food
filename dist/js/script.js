const myMenu = document.querySelector('.tabcontainer'),
      tabPhoto = myMenu.querySelectorAll('.tabcontent'),
      menuList = myMenu.querySelectorAll('.tabheader__item');

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

   menuList.forEach( (e)=> {
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