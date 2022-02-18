const wholeTemplateMessage = document.querySelector("#tmplt-message");
let timeFromWholeTemplate = wholeTemplateMessage.content.querySelector(".message-time").textContent;

const submitForm = document.querySelector(".input-message");
submitForm.addEventListener("submit", cloneText);

let spanFromWholeTemplate = wholeTemplateMessage.content.querySelector(".message-text").lastChild;
const chat = document.querySelector(".chat");

const btnSettings = document.querySelector("#settings");
btnSettings.addEventListener("click", showAuthorizationForm);
const wholeTemplateAuthorization = document.querySelector("#tmplt-authorization");





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
        submitForm.reset();
}


function showAuthorizationForm() {
    let templateClone = wholeTemplateAuthorization.content.cloneNode(true);
    document.body.append(templateClone);

    initialAuthorization();
}

function initialAuthorization() {
    const submitAuthorization = document.querySelector(".input-message-authorization");
    submitAuthorization.addEventListener("submit", getToken);   
}

async function getToken(e) {
  e.preventDefault();
    const email = 'bershardskyevgenysw@gmail.com';
    await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email
        })
      });

      
  submitFormAuthorization.addEventListener("submit", showConfirmationForm);   
}




function showConfirmationForm() {
  let templateClone = wholeTemplateConfirmation.content.cloneNode(true);
  document.body.append(templateClone);

  initialConfirmation();
}

function initialConfirmation() {
  const wholeTemplateConfirmation = document.querySelector("#tmplt-confirmation");
  wholeTemplateConfirmation.addEventListener("submit", changeName);   
}

async function changeName(e) {
  e.preventDefault();
  console.log("2121212121212121212121212121");
}




/**
(async () => {
    let user = {
      email: 'bershardskyevgenysw@gmail.com'
    };
    
    let response = await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    
    let result = await response.json();
    alert(result.message);
    })()**/