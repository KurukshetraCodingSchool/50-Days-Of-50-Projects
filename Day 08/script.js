let container = document.querySelector('.container')
let para = document.querySelector('.para')
let userimage = document.querySelector('.user-image')
let username = document.querySelector('.username')
let role = document.querySelector('.role')


let users = [
{
  name:"Abhay",
  position :"BackendDeveloper",
  photo:"https://images.unsplash.com/photo-1574149895928-d02b21afb4d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},


{
  name:"Ankit",
  position :"front - end  Developer",
  photo:"https://images.unsplash.com/photo-1712775937143-ed5fbec6e419?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG1vZGxlJTIwYm95fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

{
  name:"sundram",
  position :"Developer",
  photo:"https://images.unsplash.com/photo-1632433796512-5150a9cf78eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGxlJTIwYm95fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

{
  name:"Subhash",
  position :"Developer",
  photo:"https://images.unsplash.com/photo-1479648230934-2ab6525f4847?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vZGxlJTIwYm95fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

{
  name:"Shivam",
  position :"Developer",
  photo:"https://images.unsplash.com/photo-1739296385299-6d533018eee8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGxlJTIwYm95fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

{
  name:"Alok",
  position :"Developer",
  photo:"https://images.unsplash.com/photo-1629125882914-e76c19ef2d1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kbGUlMjBib3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

{
  name:"Vikash",
  position :"Co-founder",
  photo:"https://media.istockphoto.com/id/2214193206/photo/young-teenager-boy-wearing-plaid-shirt-isolated-on-yellow-background-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ULzRE7zlDkbvFaU_d4ol8EN6g_d6J0MOBGkB-fKrC-k=",
  text:"loA co-founder is an individual who establishes a company or organization together with one or more other people, typically from the very beginning or early stages. They are partners in the initial creation of the business, share in the responsibilities and risks, and usually receive a significant amount of equity. "
},

]
let idx = 1;

function update(){
  let {name ,position ,photo , text } = users[idx]
   
  para.innerHTML = text;
  userimage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if(idx > users.length -1){
    idx = 0;
  }

}

setInterval(update,10000)