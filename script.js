const museumContainers = [...document.querySelectorAll('.museum-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

museumContainers.forEach((item, k) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[k].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[k].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

const sectionContainer = document.querySelector(".museum-container");
async function getMuseums() {
  try {
    const response = await fetch("museums.json");
    const museums = await response.json();
    return renderMuseums(museums.museum);
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

function renderMuseums(museums) {

  [...museums].map((museum) => {
    const divCard = document.createElement("div");
    divCard.className = "museum-card";

    const museumImage = document.createElement("div");
    museumImage.className = "museum-image";

    const image = document.createElement("img");
    image.className = "museum-thumb";
    image.setAttribute("src", museum.photo);

    const divInfo = document.createElement("div");
    divInfo.className = "museum-info";

    const nameMuseum = document.createElement("h2");
    nameMuseum.className = "name";
    nameMuseum.innerText = `${museum.title}`;

    const description = document.createElement("p");
    description.className = "museum-text";
    description.innerText = `${museum.resume}`;

    sectionContainer.appendChild(divCard);
    divCard.appendChild(museumImage);
    museumImage.appendChild(image);
    divCard.appendChild(divInfo);
    divInfo.appendChild(nameMuseum);
    divInfo.appendChild(description);

    const attributes = [museum.report, museum.website, museum.facebook, museum.instagram];
    const labels = ['Relatório', 'Site', 'Facebook', 'Instagram'];
    attributes.forEach(function (btn, i) {
      const button = document.createElement('button');
      button.className = 'button';
      button.type = 'button';
      button.textContent = labels[i];
      button.setAttribute("src", btn);

      const span = document.createElement('span');
      span.className = 'cover';
      button.prepend(span);
      divInfo.appendChild(button);
    });
  });
}

getMuseums();