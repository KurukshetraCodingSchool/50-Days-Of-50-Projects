let result =document.getElementById('result')
let filter = document.getElementById('filter')

let listitem = [];

getData()
filter.addEventListener('input',(e) => filterData(e.target.value))



async function getData() {
    let res = await fetch('https://randomuser.me/api?results=50')

    let {results} = await res.json()
  
    result.innerHTML = ''

    results.forEach(user=>{
        let li = document.createElement('li')

        listitem.push(li)

        li.innerHTML = `
           <img src = "${user.picture.large}" alt = "${user.name.first}">

          <div class="user-info" >
        <h4> ${user.name.first} ${user.name.last} </h4>
        <p>${user.location.city} ,${user.location.country} </p>
     </div>

        `

        result.appendChild(li);
    })
}

function filterData (searchTerm){
    listitem.forEach(item=>{

        if(item.innerText.toLowerCase().include(searchTerm.toLowerCase()))
        {
            item.classlist.remove('hide')
        }
        else{
            item.classlist.add('hide')
        }
    })
}