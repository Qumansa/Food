const postData = async (url, data) => { // функция, которая настраивает запрос. async указывает, что внутри функции будет асинхронный код 
    const result = await fetch(url, { // получает результат. засчет await скрипт будет дожидаться, пока получит полный ответ от сервера
        method: 'POST',
        headers: { 
            'Content-type': 'application/json' // указывается тип данных
        },
        body: data
    });

    return await result.json(); // возвращает результат (промис) в json
};

const getRecource = async (url) => { 
    const result = await fetch(url);

    if(!result.ok) { // если что-то пошло не так
        throw new Error(`Could not fetch ${url}, status: ${result.status}`); // выдается сообщение об ошибке
    }

    return await result.json();
};
 
// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));

export {postData};
export {getRecource};