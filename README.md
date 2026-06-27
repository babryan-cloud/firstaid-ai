# 急救 AI 助手 v2.3

這是可直接放到 GitHub Pages 的 v2 專業版。

## v2 改良重點

- 拍照、AI、語音、搜尋、地圖拆成不同 JS 檔，方便維護。
- 搜尋與 AI 分析結果固定顯示在上方，不用往下滑找答案。
- 支援 GitHub Pages HTTPS 相機權限。
- 支援 OpenAI Vision 照片分析。
- 支援語音輸入。
- 支援 PWA 基礎檔案：manifest.json、sw.js。

## 上傳方式

把整個資料夾內的檔案上傳到 GitHub repository 根目錄：

- index.html
- css/
- js/
- manifest.json
- sw.js
- README.md

## 重要

不要把 OpenAI API Key 寫進程式碼或 commit 到 GitHub。
目前設計是使用者在網頁中輸入 Key，存在自己的瀏覽器 localStorage。

## 醫療聲明

本工具提供急救衛教與風險提醒，不是醫師診斷，不能取代急診、醫師或 119。

## v2.1 更新

- 拍照改為 iPhone/Edge 較穩的可見原生 input。
- 保留進階即時相機 getUserMedia。
- 加入相機檢測按鈕。
- 結果仍固定顯示在上方。

## v2.2 更新

- 移除 Service Worker 離線快取。
- 自動清除舊版 Service Worker 與 Cache Storage。
- 避免手機瀏覽器一直讀到舊版拍照程式。
- 上傳後請用 `?v=22` 強制刷新，例如：
  `https://babryan-cloud.github.io/firstaid-ai/?v=22`

## v2.3 更新

- 加入情境式搜尋引擎。
- 支援「路邊車禍跌倒怎麼辦」這種複合情境。
- 新增交通事故、跌倒、噎到等高風險流程。
- 搜尋結果仍固定顯示在上方。
- 上傳後建議用 `?v=23` 強制刷新：
  `https://babryan-cloud.github.io/firstaid-ai/?v=23`
