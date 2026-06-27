
export function initVoice({runSearch,setTopResult}){
  const status = document.getElementById("voiceStatus");
  document.getElementById("startVoice").addEventListener("click", ()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
      status.textContent = "此瀏覽器不支援語音辨識。";
      setTopResult("此瀏覽器不支援語音辨識，可改用打字搜尋。");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "zh-TW";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    status.textContent = "正在聽你說話……";
    rec.start();
    rec.onresult = e => {
      const text = e.results[0][0].transcript;
      status.textContent = `聽到：「${text}」`;
      runSearch(text);
    };
    rec.onerror = e => {
      status.textContent = "語音失敗：" + e.error;
      setTopResult("語音辨識失敗，請確認麥克風權限。");
    };
  });
}
