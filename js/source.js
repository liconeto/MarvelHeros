const url = "https://gateway.marvel.com:443/v1/public/characters?";
const publicKey = "15028edce7d7047ff114a2da91a75a0f";
const privateKey = "9379705b51c6aeb6302f4b4db5243495bf544867";
let dataApi = {};
let offset = 0;

function prevPage() {
  const prevItem = document.createElement("li");
  prevItem.setAttribute("id", "prevItem");
  prevItem.setAttribute("class", "navItem");
  prevItem.innerText = " < ";
  prevItem.addEventListener("click", (event) => {
    offset -= 50;
    getInfo();
  });
  document.getElementById("navBar").appendChild(prevItem);
}

function nextPage() {
  const nextItem = document.createElement("li");
  nextItem.setAttribute("id", "nextItem");
  nextItem.setAttribute("class", "navItem");
  nextItem.innerText = " > ";
  nextItem.addEventListener("click", (event) => {
    offset += 50;
    getInfo();
    dataHero(dataApi);
  });
  document.getElementById("navBar").appendChild(nextItem);
  //window.location.reload();
}

function dataHero(data) {
  let count = data.data.count;

  for (x = 0; x < count; x += 1) {
    let dados = data.data.results[x];
    const heroCard = document.getElementById("cards");

    const divHero = document.createElement("div");
    divHero.setAttribute("class", "divHero");

    const imgHero = document.createElement("img");
    imgHero.setAttribute("class", "imgHero");
    const pathImg = dados.thumbnail.path + "." + dados.thumbnail.extension;
    imgHero.setAttribute("src", `${pathImg}`);

    const nameHero = document.createElement("p");
    nameHero.setAttribute("class", "table");
    nameHero.innerHTML = `Nome: ${dados.name}`;

    /*const descHero = document.createElement("p");
    descHero.setAttribute("class", "table");
    descHero.innerHTML = `Description: ${dados.description}`;*/

    divHero.appendChild(imgHero);
    divHero.appendChild(nameHero);
    //divHero.appendChild(descHero);
    heroCard.appendChild(divHero);
  }
}

getInfo = async () => {
  //Gerando Time Stamp
  let ts = Number(new Date());
  //Gerando hash md5 (timeStamp + chavePrivada + chavePublica)
  let hash = md5(ts + privateKey + publicKey);

  let limit = 50;

  prevPage();
  nextPage();

  let resApi = await fetch(
    `${url}&ts=${ts}&offset=${offset}&limit=${limit}&apikey=${publicKey}&hash=${hash}`
  ).then((res) => res.json());
  dataApi = resApi;

  dataHero(dataApi);

  console.log(
    `${url}&ts=${ts}&offset=${offset}&limit=${limit}&apikey=${publicKey}&hash=${hash}`
  );
  console.log(`${dataApi.data.results[0].name}`);
  console.log(`Contador ${dataApi.data.count}`);
};

getInfo();
