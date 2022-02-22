export const API = {
    url:'https://chat1-341409.oa.r.appspot.com/api/user',
    urlPatchName: 'me',
    urlGetMessages: 'messages',
    headers: {'Content-Type': 'application/json'}
}

export function apiSend(URL, method, headers, body, error) {
    fetch(URL, {
        method: method,
        headers: headers,
        body: body
    })
    .then(response => response.json())
    .catch(() => alert(error))
}

export const ERORS = {
    email: 'Введите корректный e-mail',
    data: 'Запрос не удался, попробуйте ещё раз',
    key: 'Введите корректный ключ',
}