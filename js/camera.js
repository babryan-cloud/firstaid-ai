
let stream = null;
let imageDataUrl = "";

export function getImageDataUrl(){ return imageDataUrl; }

export function initCamera({setTopResult}){
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const preview = document.getElementById("preview");
  const input = document.getElementById("photoInput");
  const status = document.getElementById("cameraStatus");

  function setStatus(msg){ status.textContent = msg; }

  document.getElementById("startCamera").addEventListener("click", async ()=>{
    if(!navigator.mediaDevices?.getUserMedia){
      setStatus("此瀏覽器不支援即時相機。請改用「選照片」。");
      return;
    }
    try{
      if(stream) stream.getTracks().forEach(t=>t.stop());
      stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}}, audio:false});
      video.srcObject = stream;
      video.style.display = "block";
      setStatus("相機已啟動。對準傷口後按「拍下畫面」。");
      setTopResult("📷 相機已啟動，對準傷口後按「拍下畫面」。");
    }catch(err){
      setStatus(`相機啟動失敗：${err.name}。請確認網址是 https://，且瀏覽器相機權限已允許。`);
      setTopResult(`📷 相機啟動失敗：${err.name}。請到瀏覽器/手機設定允許相機，或改用「選照片」。`);
    }
  });

  document.getElementById("capturePhoto").addEventListener("click", ()=>{
    if(!stream){
      setStatus("尚未啟動相機。請先按「啟動相機」，或改用「選照片」。");
      setTopResult("尚未啟動相機。請先按「啟動相機」，或改用「選照片」。");
      return;
    }
    canvas.width = video.videoWidth || 960;
    canvas.height = video.videoHeight || 720;
    canvas.getContext("2d").drawImage(video,0,0,canvas.width,canvas.height);
    imageDataUrl = canvas.toDataURL("image/jpeg",0.85);
    preview.src = imageDataUrl;
    preview.style.display = "block";
    setStatus("已拍下照片，可按「AI 分析照片」。");
    setTopResult("✅ 已拍下照片。下一步：按「AI 分析照片」。");
  });

  document.getElementById("pickPhoto").addEventListener("click", ()=>{
    input.value = "";
    input.click();
  });

  input.addEventListener("change", ()=>{
    const file = input.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      imageDataUrl = e.target.result;
      preview.src = imageDataUrl;
      preview.style.display = "block";
      setStatus("已載入照片，可按「AI 分析照片」。");
      setTopResult("✅ 已載入照片。下一步：按「AI 分析照片」。");
    };
    reader.readAsDataURL(file);
  });
}
