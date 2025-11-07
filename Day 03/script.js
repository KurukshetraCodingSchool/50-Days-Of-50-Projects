const data = [
    {
        tittle : "HTML",
        desc : "HtML is the Struture of web Dev",
        img :"https://images.unsplash.com/photo-1590874315261-788881621f7a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
    },
     {
        tittle : "Back end",
        desc : "HtML is the Struture of web Dev",
        img :"https://media.istockphoto.com/id/1325875065/photo/the-word-invest-on-the-ground.webp?a=1&s=612x612&w=0&k=20&c=S2jLIXS0wO0TSum-s1Je4Zz8b-Q6xOj6xg3F62C9hHI="
    },
     {
        tittle : "Python",
        desc : "HtML is the Struture of web Dev",
        img :"https://media.istockphoto.com/id/492039834/photo/news.webp?a=1&s=612x612&w=0&k=20&c=Eqkd_6mJp40vc5hBrV2lSeHuZP6bT75ArdcQdbAN2hk="
    },
     {
        tittle : "Java",
        desc : "HtML is the Struture of web Dev",
        img :"https://images.unsplash.com/photo-1760898002480-a89156856aa0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=500"
    }
]
   

const box = document.querySelector(".container");

data.forEach(item => {
    box.innerHTML += `
     <div class="card">
            <img src="${item.img}" alt="">
            <h1>${item.tittle}</h1>
            <p>${item.desc}</p>
            <div class="btn">
                <button>learn More</button>
                <button>Pay</button>
            </div>
        </div>
        `
})