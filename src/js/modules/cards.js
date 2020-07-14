import {getRecource} from '../services/services';

function cards() {
    // шаблон для создания карточки 
    class MenuItem {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element); // если нет доп классов, то по умолчанию будет menu__item
            } else {
                this.classes.forEach(className => element.classList.add(className)); // добавление других различных классов для MenuItem
            }
             
            element.innerHTML = `
                <img src=${this.src} alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    
    // getRecource('http://localhost:3000/menu') // делается запрос на сервер, который возвращает нам массив с объектами. классический вариант
    //     .then(data => { // после этого 
    //         data.forEach(({img, altimg, title, descr, price}) => { // деструктуризация каждого объекта
    //             new MenuItem(img, altimg, title, descr, price, '.menu .container').render(); // формирование новой карточки на основе данных из объекта
    //         });
    //     });   

    axios.get('http://localhost:3000/menu') // запрос на сервер при помощи библиотеки axios
    .then(data => {          
        data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuItem(img, altimg, title, descr, price, '.menu .container').render(); 
        });
    });
}

export default cards;