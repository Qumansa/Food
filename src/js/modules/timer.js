function timer(id, deadline) {
    
    // таймер
    function getTimeRemaining(endtime) { // функция, которая определяет разницу между дедлайном и текущим временем
        const t = Date.parse(endtime) -  Date.parse(new Date()), // результат в миллисекундах
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // то, сколько дней осталось до дедлайна
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // функция, которая добавляет нули перед цифрами, если число меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }  else {
            return num;
        }
    }

    function setClock(selector, endtime) { // функция, которая устанавливает таймер на страницу
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // обновление таймера каждую секунду
        
        updateClock(); // вызов функции для того, что таймер уже был обновленный при запуске страницы, без задержки

        function updateClock() { // функция, которая обновляет таймер каждую секунду 
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // если время до конца акции закончилось
                clearInterval(timeInterval); // то таймер останавливается  
            }
        }
    }
    setClock(id, deadline);
}

export default timer;