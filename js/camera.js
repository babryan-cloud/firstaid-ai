
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

  input.addEventListener("change", ()=>{
    const file = input.files?.[0];
    if(!file){
      setStatus("沒有取得照片。請再點一次上方拍照欄位。");
      setTopResult("沒有取得照片。請再點一次上方拍照欄位，或檢查 Edge 是否允許照片/相機權限。");
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      imageDataUrl = e.target.result;
      preview.src = imageDataUrl;
      preview.style.display = "block";
      setStatus("✅ 已取得照片，可按「AI 分析照片」。");
      setTopResult("✅ 已取得照片。下一步：按「AI 分析照片」。");
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("startCamera").addEventListener("click", async ()=>{
    if(!window.isSecureContext){
      setStatus("目前不是安全環境。相機需要 HTTPS。請確認網址是 https://babryan-cloud.github.io/firstaid-ai/");
      setTopResult("相機需要 HTTPS。請確認你不是用 edge://external-file 或 http://。");
      return;
    }
    if(!navigator.mediaDevices?.getUserMedia){
      setStatus("此瀏覽器不支援即時相機 API。請改用上方原生拍照欄位。");
      setTopResult("此瀏覽器不支援即時相機 API。請改用上方「手機最穩拍照入口」。");
      return;
    }
    try{
      if(stream) stream.getTracks().forEach(t=>t.stop());
      stream = await navigator.mediaDevices.getUserMedia({
        video:{facingMode:{ideal:"environment"}},
        audio:false
      });
      video.srcObject = stream;
      video.style.display = "block";
      setStatus("即時相機已啟動。對準傷口後按「拍下即時畫面」。");
      setTopResult("📷 即時相機已啟動。對準傷口後按「拍下即時畫面」。");
    }catch(err){
      const msg = explainCameraError(err);
      setStatus(msg);
      setTopResult(msg + " 建議改用上方「手機最穩拍照入口」。");
    }
  });

  document.getElementById("capturePhoto").addEventListener("click", ()=>{
    if(!stream){
      setStatus("尚未啟動即時相機。請先按「進階：啟動即時相機」，或直接用上方拍照欄位。");
      setTopResult("尚未啟動即時相機。建議直接用上方「手機最穩拍照入口」。");
      return;
    }
    canvas.width = video.videoWidth || 960;
    canvas.height = video.videoHeight || 720;
    canvas.getContext("2d").drawImage(video,0,0,canvas.width,canvas.height);
    imageDataUrl = canvas.toDataURL("image/jpeg",0.85);
    preview.src = imageDataUrl;
    preview.style.display = "block";
    setStatus("✅ 已拍下即時畫面，可按「AI 分析照片」。");
    setTopResult("✅ 已拍下即時畫面。下一步：按「AI 分析照片」。");
  });

  document.getElementById("runCameraTest").addEventListener("click", ()=>{
    const lines = [
      "相機檢測：",
      "網址：" + location.href,
      "安全環境 isSecureContext：" + window.isSecureContext,
      "mediaDevices：" + Boolean(navigator.mediaDevices),
      "getUserMedia：" + Boolean(navigator.mediaDevices?.getUserMedia),
      "瀏覽器：" + navigator.userAgent
    ];
    const html = "<pre class='output-pre'>" + escapeHtml(lines.join("\\n")) + "</pre>";
    setTopResult(html);
    setStatus(lines.join(" / "));
  });
}

function explainCameraError(err){
  const name = err?.name || "unknown";
  if(name === "NotAllowedError") return "相機權限被拒絕。請到 iPhone 設定 → Edge → 相機 → 允許，並重新整理頁面。";
  if(name === "NotFoundError") return "找不到相機。請確認裝置有相機，或改用選照片。";
  if(name === "NotReadableError") return "相機被其他 App 使用中，請關閉相機/視訊 App 後重試。";
  if(name === "OverconstrainedError") return "後鏡頭設定不相容，請改用上方原生拍照欄位。";
  if(name === "SecurityError") return "安全限制阻擋相機。請確認使用 HTTPS GitHub Pages 網址。";
  return "相機啟動失敗：" + name;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
