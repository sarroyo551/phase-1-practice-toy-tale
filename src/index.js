let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      name: addToyForm.name.value,
      image: addToyForm.image.value,
      likes: 0,
    });
    //console.log(data);
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
    .then((response) => response.json())
    .then((responseBody) => renderToy(responseBody))
  });
  getFetch();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getFetch() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      //renderToys(data)
      //console.log(data);
      data.forEach((toy) => {
        //console.log(toy.name)
        return renderToy(toy);
      });
    });
}

function renderToy(toy) {
 //console.log(toy.name);
  let card =
    document.createElement("div"); /*making a div and giving a class of card*/
  card.className = "card";

  let h2 = document.createElement("h2");
  h2.innerHTML = toy.name; /*appending toy name to h2*/

  let img = document.createElement("img");
  img.className = "toy-avatar";
  img.setAttribute("src", toy.image); /*appending toy image to img*/

  let para = document.createElement("p");
  para.innerText = `${toy.likes} likes`; /*appending the likes to para using string interpolation (?)*/

  let button = document.createElement("button");
  button.className =
    "like-btn"; /*made button the class of like-btn, gave id of toy-id and made inner text = like so the button says like*/
  button.id = toy.id;
  button.innerText = "like";

  //like button below
  button.addEventListener("click", () => {
    const data = JSON.stringify({
      likes: toy.likes + 1,
    })
    fetch("http://localhost:3000/toys/" + toy.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
    .then((response) => response.json())
    .then(responseData => {
      toy.likes = responseData.likes
      para.innerText = `${toy.likes} likes`
    });
  });
  const collection = document.getElementById("toy-collection");

  card.append(h2, img, para, button);

  collection.append(card);
}

//console.log(renderToys())
