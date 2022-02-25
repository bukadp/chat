import Cookies from 'js-cookie';
import {UI} from './view.js';
import {API, apiSend, ERORS} from './api';

const wholeTemplateMessageMe = document.querySelector("#tmplt-message");
const wholeTemplateMessageUser = document.querySelector("#tmplt-message-user");

const timeFromWholeTemplate = wholeTemplateMessageMe.content.querySelector(".message-time").textContent;
const submitForm = document.querySelector(".input-message");
const spanTextFromWholeTemplate = wholeTemplateMessageMe.content.querySelector(".message-text").lastChild;
const spanTextFromWholeTemplateUser = wholeTemplateMessageUser.content.querySelector(".message-text").lastChild;
const chat = document.querySelector(".chat");
const btnSettings = document.querySelector("#settings");
const wholeTemplateAuthorization = document.querySelector("#tmplt-authorization");
const wholeTemplateConfirmation = document.querySelector("#tmplt-confirmation");
const wholeTemplateSettings = document.querySelector("#tmplt-settings");
const inputText = document.querySelector(".input-text");
const getCookiesToken = Cookies.get('token');
const btnSignOut = document.querySelector("#signout"); 



submitForm.addEventListener("submit", cloneText);
btnSettings.addEventListener("click", switchTemplates);
btnSignOut.addEventListener("click", signOut);


function cloneText(e){
  e.preventDefault()
  spanTextFromWholeTemplate.textContent = inputText.value;
  let templateClone = wholeTemplateMessageMe.content.cloneNode(true);
  insertText(templateClone);
  runningSoket();
  console.log(inputText);
  console.log(inputText.value);
  console.log(spanTextFromWholeTemplate.textContent);
 
}

function insertText(template) {
  chat.append(template);
  submitForm.reset();
 // ИМЯ!!! const spanNameFromWholeTemplate = wholeTemplateMessageMe.content.querySelector(".message-text").firstChild;
 // ИМЯ!!! spanNameFromWholeTemplate.textContent = "МОЕ сообщение: "
}

function runningSoket() {
  const socket = new WebSocket(`ws://chat1-341409.oa.r.appspot.com/websockets?${getCookiesToken}`);
  
  socket.onopen = function(e) {
    //alert("[open] Соединение установлено");
    //alert("Отправляем данные на сервер");
  socket.send(JSON.stringify({
    text: spanTextFromWholeTemplate.textContent,
  }));
}
  
  socket.onmessage = function(event) {
    const onmessageData = JSON.parse(event.data);
    console.log(onmessageData.text);
    console.log(onmessageData.user.email);
    console.log(onmessageData.user.name);
  };
}

function switchTemplates() {
  if (typeof getCookiesToken == "undefined" ) {
    showAuthorizationForm();
  } else {  
  showSettingsForm();
  }
}


/**-------------------------------------------
function cloneText(e){
        e.preventDefault()
        spanTextFromWholeTemplate.textContent = inputText.value;
        let templateClone = wholeTemplateMessageMe.content.cloneNode(true);
        insertText(templateClone);
}

function insertText(template) {
        chat.append(template);
        submitForm.reset();
        const spanNameFromWholeTemplate = wholeTemplateMessageMe.content.querySelector(".message-text").firstChild;
}
-------------------------------------------**/
function showAuthorizationForm() {
    let templateClone = wholeTemplateAuthorization.content.cloneNode(true);
    document.body.append(templateClone);
    setTimeout(initialAuthorization, 1000);
}

function initialAuthorization() {
    const submitAuthorization = document.querySelector(".input-message-authorization");
    submitAuthorization.addEventListener("submit", handlerAuthorization);   
    const btnClose = document.querySelector(".btn-cross");
btnClose.addEventListener("click", () => {document.querySelector(".body-modals-authorization").style.visibility = "hidden";});
}

function handlerAuthorization(event){
  event.preventDefault()
  getToken();
  
  
}

async function getToken() {
  let submitAuthorizationValue = document.querySelector(".input-text-authorization").value;
  //const body = JSON.stringify({email: submitAuthorizationValue});
  if (!submitAuthorizationValue.includes('@')) { 
alert(ERORS.email)
  } else {
   
    await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: submitAuthorizationValue
        })
      });    
     // apiSend (API.url, 'POST', API.headers, body, ERORS.data);
      showConfirmationForm();
    }
}

function showConfirmationForm() {
  let templateClone = wholeTemplateConfirmation.content.cloneNode(true);
  document.body.append(templateClone);
  setTimeout(initialConfirmation, 1000);
}

function initialConfirmation() {
  //const submitConfirmation = document.querySelector(".input-message-confirmation");
 // submitConfirmation = wholeTemplateConfirmation.content.querySelector(".input-message-confirmation");
  //submitConfirmation.addEventListener("submit", handlerConfirmation);
  const submitConfirmation = document.querySelector(".input-message-confirmation");
  submitConfirmation.addEventListener("submit", handlerConfirmation);   
  const btnClose = document.querySelector(".btn-cross");
btnClose.addEventListener("click", () => {document.querySelector(".body-modals-confirmation").style.visibility = "hidden";});
}

function handlerConfirmation(e) {
  e.preventDefault();
  let submitConfirmationValue = document.querySelector(".input-text-confirmation").value;
  if (submitConfirmationValue.length < 180) {
    alert (ERORS.key);
  } else{
    setCookies(submitConfirmationValue);
    showSettingsForm();
  }
}

function setCookies(submitConfirmationValue) {
  Cookies.set('token', submitConfirmationValue);
}

function showSettingsForm() {
  let templateClone = wholeTemplateSettings.content.cloneNode(true);
  document.body.append(templateClone);
  setTimeout(initialSettings, 1000);
}

function initialSettings() {
  const submitSettings = document.querySelector(".input-message-modals");
  submitSettings.addEventListener("submit", changeName);
  const btnClose = document.querySelector(".btn-cross");
  btnClose.addEventListener("click", () => {document.querySelector(".body-modals-settings").style.visibility = "hidden";});
}


async function changeName(e) {
  e.preventDefault();
  let submitSettingsNameValue = document.querySelector(".input-text-modals").value;
  /**let newUrlPatchName = new URL(API.urlPatchName, API.url);
  headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': `Bearer ${getCookiesToken}`
  }
  body = JSON.stringify({
    name: submitSettingsNameValue
  });
  apiSend (newUrlPatchName, 'PATCH', headers, body, ERORS.data);**/
  
  await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${getCookiesToken}`
    },
    body: JSON.stringify({
      name: submitSettingsNameValue
    })
  });

  console.log(getCookiesToken);
 //getName();
 //setTimeout(getMessages, 1000);
  //getMessages(getCookiesToken);
  hiddenSettingsTmplt();
  //setTimeout(hiddenSettingsTmplt, 1000);

}

function hiddenSettingsTmplt() {
   document.querySelector(".body-modals-settings").style.visibility = "hidden"
} 


async function getName() {
   let response = await fetch('https://chat1-341409.oa.r.appspot.com/api/user/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getCookiesToken}`
    },
  });
  let result = await response.json();
  alert(result.name);
}

/**
function getMessages() {
  fetch('https://chat1-341409.oa.r.appspot.com/api/messages/', {
   method: 'GET',
   headers: {
     'Authorization': `Bearer ${getCookiesToken}`
   }
  })
  .then((response) => response.json())
  .then (data => {

    for (let i = 0; i < data.messages.length; i++) {
      const DATA = {
          NAME: 'Собеседник мой',
          TEXT_MESSAGE: data.messages[i].message,
          TIME_MESSAGE: data.messages[i].createdAt,
          CLASS: 'message message-to-me',
      }   

    spanTextFromWholeTemplateUser.textContent = `${data.messages[i].message}`;
      let templateClone = wholeTemplateMessageUser.content.cloneNode(true);
      chat.append(templateClone);
    }
  })
 .catch(error => alert(error.message)); 
  }
**/
  async function signOut() {
    await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${getCookiesToken}`
      },
      body: JSON.stringify({
        name: "none"
      })
    });

    getName();
  Cookies.remove('token');
  
}