function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    // слайдер
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          sliderArrowPrev = document.querySelector(prevArrow),
          sliderArrowNext = document.querySelector(nextArrow),
          totalSlides = document.querySelector(totalCounter),
          currentSlide = document.querySelector(currentCounter);
    
    let slideIndex = 1;
    
    // 1 вариант
    // showSlides(slideIndex); // инициализация слайдера для формирования инзначально нужной структуры

    // if (slides.length < 10) {
    //     totalSlides.textContent = `0${slides.length}`;
    // } else {
    //     totalSlides.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1; // если n уходит в правую границу, он обновляется
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length; // если n уходит в лвеую границу, он обновляется
    //     }

    //     slides.forEach(slide => {
    //         slide.style.display = 'none';
    //     });

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         currentSlide.textContent = `0${slideIndex}`;
    //     } else {
    //         currentSlide.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // sliderArrowPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // sliderArrowNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // 2 вариант
    const slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${slideIndex}`;
    } else {
        totalSlides.textContent = slides.length;
        currentSlide.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; // выстраивание слайдов в ряд
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = slidesWrapperWidth;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    let offset = 0; // переменная, которая показывает количество отступа

    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    }

    sliderArrowNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(slidesWrapperWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(slidesWrapperWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    sliderArrowPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(slidesWrapperWidth) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(slidesWrapperWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(slidesWrapperWidth) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currentSlide.textContent = `0${slideIndex}`;
            } else {
                currentSlide.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5'); 
            dots[slideIndex - 1].style.opacity = 1; 
        });
    });
}

export default slider;