# 急救 AI 助手 v2

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
