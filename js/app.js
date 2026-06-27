
import { topics, findTopic, renderTopic } from "./search.js";
import { initCamera } from "./camera.js";
import { initAI } from "./ai.js";
import { initVoice } from "./voice.js";
import { initMaps } from "./maps.js";

const topBody = document.getElementById("topResultBody");
function setTopResult(html){ topBody.innerHTML = html; document.getElementById("topResult").scrollIntoView({behavior:"smooth",block:"start"}); }

function switchPanel(name){
  document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
  document.getElementById("panel-"+name).classList.add("active");
}

function runSearch(query){
  document.getElementById("searchInput").value = query;
  const topic = findTopic(query);
  setTopResult(renderTopic(topic));
}

document.querySelectorAll("[data-panel]").forEach(btn=>btn.addEventListener("click",()=>switchPanel(btn.dataset.panel)));
document.querySelectorAll("[data-search]").forEach(btn=>btn.addEventListener("click",()=>runSearch(btn.dataset.search)));
document.getElementById("clearResult").addEventListener("click",()=>setTopResult("請先搜尋、語音輸入或拍照分析。"));

document.getElementById("darkBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("dark_mode",document.body.classList.contains("dark")?"1":"0");
});
if(localStorage.getItem("dark_mode")==="1") document.body.classList.add("dark");

const chips = document.getElementById("chips");
topics.forEach(t=>{
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.textContent = `${t.icon} ${t.title}`;
  chip.addEventListener("click",()=>runSearch(t.keys[0]));
  chips.appendChild(chip);
});

let timer=null;
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input",()=>{
  clearTimeout(timer);
  timer=setTimeout(()=>runSearch(searchInput.value),900);
});
searchInput.addEventListener("keydown",e=>{if(e.key==="Enter") runSearch(searchInput.value)});
document.getElementById("searchBtn").addEventListener("click",()=>runSearch(searchInput.value));

initCamera({setTopResult});
initAI({setTopResult});
initVoice({runSearch,setTopResult});
initMaps();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
