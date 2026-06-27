
export function initMaps(){
  document.getElementById("call119").addEventListener("click", ()=> location.href="tel:119");
  document.getElementById("nearHospital").addEventListener("click", ()=> location.href="https://www.google.com/maps/search/?api=1&query=%E9%99%84%E8%BF%91%E9%86%AB%E9%99%A2");
  document.getElementById("nearClinic").addEventListener("click", ()=> location.href="https://www.google.com/maps/search/?api=1&query=%E9%99%84%E8%BF%91%E8%A8%BA%E6%89%80");
  document.getElementById("appleMaps").addEventListener("click", ()=> location.href="https://maps.apple.com/?q=%E9%99%84%E8%BF%91%E9%86%AB%E9%99%A2");
}
