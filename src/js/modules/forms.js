import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector),
          message = {
              loading: 'img/form/spinner.svg', // спиннер загрузки
              success: 'Спасибо! Скоро мы с Вами свяжемся!',
              failure: 'Что-то пошло не так... '
          };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // конструктор, который собирает экземпляры (объекты) того, что заполнил пользователь в форме
            
            // если данные необходимо передать в обычном формате
            // fetch('../server.php', { // во время запроса данные будут отправляться на 'server.php' 
            //     method: 'POST', // данные будут отправляться, а не приниматься
            //     body: formData // указываются сами данные
            // })

            // если данные необходимо отправить в формате json
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // берется formData, превращается в массив массивов, потом в объект, потом в json объект

            postData('http://localhost:3000/requests', json) // посылаем данные в формате json на сервет. нет ; для цепочки

            // далее 
            .then(data => { // действия, которые выполняются в случае успешной отправки данных на сервер
                // console.log(data); // data - данные, которые вернул сервер 
                showThanksModal(message.success);
                statusMessage.remove(); // удаление спиннера
            }).catch(() => { // действия, которые выполняются в случае неуспешной отправки данных на сервер
                showThanksModal(message.failure);
            }).finally(() => { // // действия, которые выполняются в любом случае после отправки данных на сервер
                form.reset(); // очистка формы
            });
        });
    }
    forms.forEach(item => {
        bindPostData(item);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;