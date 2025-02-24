

const allMenu = () => {
    // fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    fetch("https://randomuser.me/api/?results=60&seed=pobar")
    .then(res=>res.json())
    .then(data=> {
      // console.log(data.results);
      displayProduct(data.results);
      
    });
};


function showDetails(image, name, gender, cell, email, location) {
  document.getElementById("modal-img").src = image;
  document.getElementById("modal-title").innerText = name;
  document.getElementById("modal-gender").innerText = `Gender: ${gender}`;
  document.getElementById("modal-cell").innerText = `Cell: ${cell}`;
  document.getElementById("modal-email").innerText = `Email: ${email}`;
  document.getElementById("modal-location").innerText = `Location: ${location}`;

  document.getElementById("detailsModal").style.display = "block";
}
document.querySelector(".close").onclick = function() {
  document.getElementById("detailsModal").style.display = "none";
};
window.onclick = function(event) {
  if (event.target === document.getElementById("detailsModal")) {
      document.getElementById("detailsModal").style.display = "none";
  }
};


const displayProduct = (users) => {
  const productcontainer = document.getElementById("product-container");
    users.forEach(user => {
    // console.log(user);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img class="card-img" src=${user.picture.large} alt=""/>
    <h5>${user.name.title} ${user.name.first} ${user.name.last}</h5>
    <p>${user.gender}</p>
    <p>${user.cell}</p>
    <p>${user.email}</p>
    <p>${user.location.city}</p>
    <button onclick="showDetails('${user.picture.large}', '${user.name.title} ${user.name.first} ${user.name.last}', '${user.gender}', '${user.cell}', '${user.email}', '${user.location.city}')">Details</button>
    <button onclick="addcart('${user.name.title} ${user.name.first} ${user.name.last}', '${user.cell}', '${user.email}')">Add to cart</button>
    `;
    productcontainer.appendChild(div);
  });
}


const addcart = (name2,cell,email) =>{
  const cartCount=document.getElementById("count").innerText;

  let conCount=parseInt(cartCount)
  if(conCount<11) {
    conCount+=1;
    document.getElementById("count").innerText=conCount;
  }
  

  const container=document.getElementById("cart-main-container");
  const div=document.createElement("div");
  div.classList.add("cart-info");
  div.innerHTML=`
  <p>${name2}</p>
  <p>${cell}</p>
  <p>${email}</p>

  
  `
  if(conCount>=11) {
    warn();
  }
  else container.appendChild(div);
  
}
function warn() {
  alert("You have added 11 people!");
}

function searchUser() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
      let name = card.querySelector("h5").innerText.toLowerCase();
      if (name.includes(input)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  });
}



allMenu()