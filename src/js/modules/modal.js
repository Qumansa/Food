function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // запрет прокрутки при открытом мод.окне

    if (modalTimerId) {
        clearInterval(modalTimerId); // если пользователь сам открыл мод.окно за первые 30 секунд на сайте, оно не будет потом ещё раз открыто из-за таймера
    }
    
}

function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // модальное окно
    const modalTriggersBtns = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    

    modalTriggersBtns.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    

    // закрытие мод.окна при клике на затемненную зону или на крестик
    modal.addEventListener('click', (e) => { 
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    // закрытие мод.окна при клике на ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // при долистывании страницы до конца, появляется мод. окно
    // function openModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal(modalSelector, modalTimerId);
    //         window.removeEventListener('scroll', openModalByScroll); // если после долистывания до конца мод. окно открылось, больше оно не будет зависеть от скролла
    //     }
    // }

    // window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};