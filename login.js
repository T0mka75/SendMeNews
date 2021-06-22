const form = document.getElementById('form')
const inputlog = form.querySelector('#username__input')
const inputpass = form.querySelector('#password__input')
const loginBtn = form.querySelector('#loginBtn')


form.addEventListener('submit', submitFormHandler)
inputpass.addEventListener('input', () => {
    loginBtn.disabled = !isValid(inputlog.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    const email = event.target.querySelector('#username__input').value
    const password = event.target.querySelector('#password__input').value

    if (isValid(inputlog.value) && isValid(inputpass.value)) {
        const user = {
            email,
            password
        }


        User.create(user).then(() => {
            inputlog.value = ''
            inputpass.value = ''
            loginBtn.disabled = false
        })

    }
}

function renderModalAfterAuth(content) {
    console.log('content', content)
}

class User {
    static create(user) {
        fetch('https://news-49330-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }
    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">Incorrect password</p>')
        }
        return fetch(`https://news-49330-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">Incorrect password</p>`
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }
}

function isValid(value) {
    return value.length >= 5
}

function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDwUzk_WDEHAJQB9fM8Dv231rjs94g791o'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(console.log(response))
        .then(data => data.idToken)
}