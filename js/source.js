import { md5 } from "md5";

const url = "https://gateway.marvel.com:443/v1/public/characters?";
const publicKey = "15028edce7d7047ff114a2da91a75a0f";
const privateKey = "9379705b51c6aeb6302f4b4db5243495bf544867";
let dataApi = {};

getAnswers = async () => {
  //Gerando Time Stamp
  let ts = Number(new Date());
  //Gerando hash md5 (timeStamp + chavePrivada + chavePublica)
  let hash = md5(ts + privateKey + publicKey);

  let dataQuestionsUn = await fetch(
    `${url}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  ).then((res) => res.json());

  console.log(`${url}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  dataApi = dataQuestionsUn;
};

console.log(getAnswers());
