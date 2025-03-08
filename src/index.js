'use strict';

import "./style.css";

// document.querySelector('.add-btn').addEventListener('click', async () => {
//     const newUser = {
//         name: 'Jack (' + Date.now() + ')',
//         age: 25,
//         email: `qwerty${Date.now()}@gmail.com`
//     };

//     const response = await fetch('/users', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(newUser)
//     })
// });


const form = document.querySelector('.form');

const verificationsRegEx = {
    name: /^[A-Za-zА-Яа-яІіЇїЄє\s]{2,}$/,
    message: /^.{5,500}$/, 
    phone: /^\+380\d{9}$/,
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
};

form.addEventListener('submit', event => {
    event.preventDefault(); 

    const inputs = form.querySelectorAll('.form-input');
    let isValid = true;
    const formData = {};

    inputs.forEach(input => {
        const valid = validateField(input);

        if (!valid) {
            isValid = false;
        }

        formData[input.name] = input.value.trim();
    });

    if (isValid) {

        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
            .then(async response => {
              if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(errorText || `Помилка ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              inputs.forEach(input => {
                input.value = '';
              });
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
            
                if (error.message.includes('email')) {
                  alert('Цей e-mail вже використовується!');
                } else if (error.message.includes('phone')) {
                  alert('Цей номер телефону використовується!');
                } else {
                  alert('Помилка: Щось пішло не так!');
                }
              });
    }
});

form.addEventListener('blur', event => {
    const input = event.target;

    if (input.classList.contains('form-input')) {
        validateField(input);
    }

}, true);

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    const verification = verificationsRegEx[fieldName];

    if (fieldName === 'name' && !verification.test(value)) {
        showError(input, "некоректне ім'я (має містити лише букви алфавіту, та бути більше 1 букви)");
        return false;
    }

    if (fieldName === 'message' && !verification.test(value)) {
        showError(input, 'надто коротке повідомлення');
        return false;
    }

    if (fieldName === 'phone' && !verification.test(value)) {
        showError(input, 'номер повинен мати вигдял: +380... (9 цифр після коду країни)');
        return false;
    }

    if (fieldName === 'email' && !verification.test(value)) {
        showError(input, 'некоректна назва електронної пошти');
        return false;
    }

    removeError(input);
    return true;
}

function showError(input, message) {
    const prevError = input.nextElementSibling;

    if (prevError.classList.contains('error-message')){
        prevError.remove();
    }
    
    const currentError = document.createElement('div');
    currentError.classList.add('error-message');
    currentError.textContent = message;

    input.after(currentError);

    input.classList.add('input-invalid');
}

function removeError(input) {
    const currentError = input.nextElementSibling;
    
    if (currentError.classList.contains('error-message')) {
        currentError.remove();
    }

    input.classList.remove('input-invalid');
}


const messageBlock = document.querySelector('.msg-box');
const usersList = document.querySelector('.users-list');

messageBlock.addEventListener('click', async () => {
    const response = await fetch('/users');
    const users = await response.json();
    const usersItems = users.map(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('users-li');
        userItem.innerHTML = `<div>Name: ${user.name}</div><div>Phone: ${user.phone}</div><div>email: ${user.email}</div><div>Message: ${user.message}</div>`;
        return userItem;
    });
    usersList.innerHTML = '';
    usersList.prepend(...usersItems);
});