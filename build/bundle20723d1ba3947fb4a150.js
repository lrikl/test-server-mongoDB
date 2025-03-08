/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\r\n\r\n\r\n\r\nconst form = document.querySelector('.form');\r\n\r\nconst verificationsRegEx = {\r\n    name: /^[A-Za-zА-Яа-яІіЇїЄє\\s]{2,}$/,\r\n    message: /^.{5,500}$/, \r\n    phone: /^\\+380\\d{9}$/,\r\n    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/i,\r\n};\r\n\r\nform.addEventListener('submit', event => {\r\n    event.preventDefault(); \r\n\r\n    const inputs = form.querySelectorAll('.form-input');\r\n    let isValid = true;\r\n    const formData = {};\r\n\r\n    inputs.forEach(input => {\r\n        const valid = validateField(input);\r\n\r\n        if (!valid) {\r\n            isValid = false;\r\n        }\r\n\r\n        formData[input.name] = input.value.trim();\r\n    });\r\n\r\n    if (isValid) {\r\n\r\n        fetch('/users', {\r\n            method: 'POST',\r\n            headers: { 'Content-Type': 'application/json' },\r\n            body: JSON.stringify(formData)\r\n          })\r\n            .then(async response => {\r\n              if (!response.ok) {\r\n                const errorText = await response.text(); \r\n                throw new Error(errorText || `Помилка ${response.status}`);\r\n              }\r\n              return response.json();\r\n            })\r\n            .then(data => {\r\n              inputs.forEach(input => {\r\n                input.value = '';\r\n              });\r\n            })\r\n            .catch(error => {\r\n                console.error('Помилка:', error.message);\r\n            \r\n                if (error.message.includes('email')) {\r\n                  alert('Цей e-mail вже використовується!');\r\n                } else if (error.message.includes('phone')) {\r\n                  alert('Цей номер телефону використовується!');\r\n                } else {\r\n                  alert('Помилка: Щось пішло не так!');\r\n                }\r\n              });\r\n    }\r\n});\r\n\r\nform.addEventListener('blur', event => {\r\n    const input = event.target;\r\n\r\n    if (input.classList.contains('form-input')) {\r\n        validateField(input);\r\n    }\r\n\r\n}, true);\r\n\r\nfunction validateField(input) {\r\n    const value = input.value.trim();\r\n    const fieldName = input.name;\r\n    const verification = verificationsRegEx[fieldName];\r\n\r\n    if (fieldName === 'name' && !verification.test(value)) {\r\n        showError(input, \"некоректне ім'я (має містити лише букви алфавіту, та бути більше 1 букви)\");\r\n        return false;\r\n    }\r\n\r\n    if (fieldName === 'message' && !verification.test(value)) {\r\n        showError(input, 'надто коротке повідомлення');\r\n        return false;\r\n    }\r\n\r\n    if (fieldName === 'phone' && !verification.test(value)) {\r\n        showError(input, 'номер повинен мати вигдял: +380... (9 цифр після коду країни)');\r\n        return false;\r\n    }\r\n\r\n    if (fieldName === 'email' && !verification.test(value)) {\r\n        showError(input, 'некоректна назва електронної пошти');\r\n        return false;\r\n    }\r\n\r\n    removeError(input);\r\n    return true;\r\n}\r\n\r\nfunction showError(input, message) {\r\n    const prevError = input.nextElementSibling;\r\n\r\n    if (prevError.classList.contains('error-message')){\r\n        prevError.remove();\r\n    }\r\n    \r\n    const currentError = document.createElement('div');\r\n    currentError.classList.add('error-message');\r\n    currentError.textContent = message;\r\n\r\n    input.after(currentError);\r\n\r\n    input.classList.add('input-invalid');\r\n}\r\n\r\nfunction removeError(input) {\r\n    const currentError = input.nextElementSibling;\r\n    \r\n    if (currentError.classList.contains('error-message')) {\r\n        currentError.remove();\r\n    }\r\n\r\n    input.classList.remove('input-invalid');\r\n}\r\n\r\n\r\nconst messageBlock = document.querySelector('.msg-box');\r\nconst usersList = document.querySelector('.users-list');\r\n\r\nmessageBlock.addEventListener('click', async () => {\r\n    const response = await fetch('/users');\r\n    const users = await response.json();\r\n    const usersItems = users.map(user => {\r\n        const userItem = document.createElement('li');\r\n        userItem.classList.add('users-li');\r\n        userItem.innerHTML = `<div>Name: ${user.name}</div><div>Phone: ${user.phone}</div><div>email: ${user.email}</div><div>Message: ${user.message}</div>`;\r\n        return userItem;\r\n    });\r\n    usersList.innerHTML = '';\r\n    usersList.prepend(...usersItems);\r\n});\n\n//# sourceURL=webpack://dz-34(webpack)/./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://dz-34(webpack)/./src/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;