'use strict';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
    // появление мод.окна через 300 секунд после загрузки страницы
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    calc();
    cards(); 
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide', 
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next', 
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-08-01');
});


