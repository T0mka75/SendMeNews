const postForm = document.getElementById('postForm')
const title = postForm.querySelector('#postTitle')
const imageURL = postForm.querySelector('#postImageURL')
const postBtn = postForm.querySelector('#postNewBtn')

document.getElementById('post-new').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = "none";
});

postForm.addEventListener('submit', submitFormHandler)

function submitFormHandler(event) {
    event.preventDefault()

    const neww = {
        title: title.value,
        imageUrl: imageURL.value
    }

    console.log(neww)
}


async function getNews() {
    let response = await fetch("https://free-news.p.rapidapi.com/v1/search?q=Elon%20Musk&lang=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e357d25477msh8aa00378bd22e49p1e6704jsn72badd864c1f",
            "x-rapidapi-host": "free-news.p.rapidapi.com"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR")
            }
            return response.json()
        })
        .then(data => {
            let list = document.querySelector('.inner')
            let list2 = document.querySelector('.inner2')
            let key;
            for (key in data.articles) {
                if (key == 20) {
                    break;
                }
                if (key >= 10) {
                    list2.innerHTML += `
            <div class="column">
                <div class="column__image">
                    <a href="${data.articles[key].link}"><img alt="News Entry" src="${data.articles[key].media}"></a>
                </div>
                <div class="column__content">
                    <div class="column__content__date">
                        <span>${data.articles[key].published_date}</span>
                    </div>
                    <h3 class="column__content__title">
                        ${data.articles[key].title}
                    </h3>
                </div>
            </div>    
        `
                    continue
                }
                list.innerHTML += `
            <div class="column">
                <div class="column__image">
                    <a href="${data.articles[key].link}"><img alt="News Entry" src="${data.articles[key].media}"></a>
                </div>
                <div class="column__content">
                    <div class="column__content__date">
                        <span>${data.articles[key].published_date}</span>
                    </div>
                    <h3 class="column__content__title">
                        ${data.articles[key].title}
                    </h3>
                </div>
            </div>    
        `
            }
        })
        .catch(err => {
            console.error(err);
        });
}
getNews()

class New {
    static create(New) {
        fetch('https://news-49330-default-rtdb.europe-west1.firebasedatabase.app/news.json', {
            method: 'POST',
            body: JSON.stringify(New),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }
}

const getUsersBtn = document.querySelector('#get-users')
getUsersBtn.addEventListener('click', () => {
    window.location.href = 'login.html'
})

