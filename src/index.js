'use strict';

import "./style.scss";

const messageBlock = document.querySelector('.msg-box');
const usersList = document.querySelector('.users-list');
messageBlock.addEventListener('click', async () => {
    const response = await fetch('/users');
    const users = await response.json();
    const usersItems = users.map(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `<div>Name: ${user.name}</div><div>Age: ${user.age}</div><div>email: ${user.email}</div>`;
        return userItem;
    });
    usersList.innerHTML = '';
    usersList.prepend(...usersItems);
});

document.querySelector('.add-btn').addEventListener('click', async () => {
    const newUser = {
        name: 'Jack (' + Date.now() + ')',
        age: 25,
        email: `qwerty${Date.now()}@gmail.com`
    };

    const response = await fetch('/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    })
});