
import { getImageDataUrl } from "./camera.js";

export function initAI({setTopResult}){
  const keyInput = document.getElementById("apiKey");
  const saved = localStorage.getItem("openai_api_key");
  if(saved) keyInput.value = saved;

  document.getElementById("saveKey").addEventListener("click", ()=>{
    const key = keyInput.value.trim();
    if(!key){ setTopResult("請先貼上 OpenAI API Key。"); return; }
    localStorage.setItem("openai_api_key", key);
    setTopResult("✅ API Key 已儲存在本機瀏覽器。不要把 Key 寫進 GitHub。");
  });

  document.getElementById("clearKey").addEventListener("click", ()=>{
    localStorage.removeItem("openai_api_key");
    keyInput.value = "";
    setTopResult("已清除 API Key。");
  });

  document.getElementById("analyzePhoto").addEventListener("click", async ()=>{
    const image = getImageDataUrl();
    if(!image){ setTopResult("請先拍照或選照片。"); return; }
    const key = keyInput.value.trim() || localStorage.getItem("openai_api_key") || "";
    if(!key){ setTopResult("請先輸入 OpenAI API Key。"); return; }

    setTopResult("🤖 AI 分析中，請稍候……");
    const model = document.getElementById("model").value;
    const prompt = `你是急救衛教助手。請根據照片做非診斷性分析：
- 用繁體中文
- 不可宣稱確診
- 結果放在最上方，清楚列點
- 優先指出是否有 119 或急診警訊
- 給居家急救步驟
- 列出不能從照片確認的事情
格式：
【可能情況】
【立即處理】
【需要就醫/119警訊】
【不能從照片確認】`;

    try{
      const res = await fetch("https://api.openai.com/v1/responses",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},
        body:JSON.stringify({
          model,
          input:[{role:"user",content:[
            {type:"input_text",text:prompt},
            {type:"input_image",image_url:image}
          ]}],
          max_output_tokens:900
        })
      });
      const data = await res.json();
      if(!res.ok){
        setTopResult(`<div class="danger">API 錯誤</div><pre class="output-pre">${escapeHtml(JSON.stringify(data,null,2))}</pre>`);
        return;
      }
      const text = data.output_text || extractText(data) || JSON.stringify(data,null,2);
      setTopResult(`<pre class="output-pre">${escapeHtml(text)}</pre>`);
    }catch(err){
      setTopResult(`<div class="danger">呼叫 API 失敗：${escapeHtml(err.message)}</div>`);
    }
  });
}

function extractText(data){
  try{
    return data.output.flatMap(o=>o.content||[]).map(c=>c.text || c.output_text || "").join("\\n");
  }catch{ return ""; }
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
