import Cookies from './node_modules/js-cookie/index.js'

const wholeTemplateMessage = document.querySelector("#tmplt-message");
let timeFromWholeTemplate = wholeTemplateMessage.content.querySelector(".message-time").textContent;

const submitForm = document.querySelector(".input-message");
submitForm.addEventListener("submit", cloneText);

let spanFromWholeTemplate = wholeTemplateMessage.content.querySelector(".message-text").lastChild;
const chat = document.querySelector(".chat");

const btnSettings = document.querySelector("#settings");
btnSettings.addEventListener("click", showAuthorizationForm);
const wholeTemplateAuthorization = document.querySelector("#tmplt-authorization");
const wholeTemplateConfirmation = document.querySelector("#tmplt-confirmation");
const wholeTemplateSettings = document.querySelector("#tmplt-settings");


function cloneText(e){
        e.preventDefault()
        const inputText = document.querySelector(".input-text").value;
        spanFromWholeTemplate.textContent = inputText;
        let templateClone = wholeTemplateMessage.content.cloneNode(true);
        insertText(templateClone);
}

//function insertTime() {
//const today = new Date();
//}

function insertText(template) {
        chat.append(template);
        window.scrollTo(0,document.body.scrollHeight);
        //*chat.scrollTop = chat.scrollHeight;**/
        submitForm.reset();
}


function showAuthorizationForm() {
    let templateClone = wholeTemplateAuthorization.content.cloneNode(true);
    document.body.append(templateClone);

    setTimeout(initialAuthorization, 1000);
}

function initialAuthorization() {
    const submitAuthorization = document.querySelector(".input-message-authorization");
    submitAuthorization.addEventListener("submit", handlerAuthorization);   
}

function handlerAuthorization(event){
  event.preventDefault()
  getToken();
  showConfirmationForm();
}

async function getToken() {
  let submitAuthorizationValue = document.querySelector(".input-text-authorization").value;
  if (!submitAuthorizationValue.includes('@')) { 
alert("Введите корректный email")
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
    }
}


function showConfirmationForm() {
  let templateClone = wholeTemplateConfirmation.content.cloneNode(true);
  document.body.append(templateClone);
  //let submitConfirmationValue = document.querySelector(".input-text-confirmation");

  setTimeout(initialConfirmation, 1000);
}

function initialConfirmation() {
  const submitConfirmation = document.querySelector(".input-message-confirmation");
  //let submitConfirmationValue = document.querySelector("#cod-chat");
  submitConfirmation.addEventListener("submit", handlerConfirmation);
}

function handlerConfirmation(e) {
  e.preventDefault();
  setCookies();
  showSettingsForm();
}

function setCookies() {
  let submitConfirmationValue = document.querySelector(".input-text-confirmation").value;
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
}

async function changeName(e) {
  e.preventDefault();
  let submitSettingsNameValue = document.querySelector(".input-text-modals").value;
  let getCookiesToken = Cookies.get('token');
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
  getName(getCookiesToken);
}

async function getName(token) {
   let response = await fetch('https://chat1-341409.oa.r.appspot.com/api/user/me', {
    method: 'GET',
    headers: {
     // 'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
  });
  let result = await response.json();
  alert(result.name);
}

