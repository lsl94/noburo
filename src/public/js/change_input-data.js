/**
 * change student input data
 * @author lsl 
 * @createdTime 2025-08-06 00:31
 */

// 將文字轉為 SHA-256 的 hex 雜湊字串
async function sha256(text) {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
    return hashHex
}

// 主查詢邏輯
async function queryStudent() {
    const name = document.getElementById("name").value.trim()
    const queryInput = document.getElementById("query").value.trim()
    const resultDiv = document.getElementById("stu-result")
    resultDiv.innerHTML = ""

    if (!name || !queryInput) {
        resultDiv.textContent = "請輸入姓名與查詢碼"
        return
    }

    const key = name + queryInput
    const hash = await sha256(key)
    const filePath = `../data/${hash}.json`

    try {
        const res = await fetch(filePath)
        if (!res.ok) throw new Error("查無資料")
        const student = await res.json()

        // 取出需要的欄位
        const {
            payment_date,
            expiration_date,
            total_lessons,
            attended_lessons,
            remaining_lessons,
            attendance_record = []
        } = student

        // 顯示主要資訊
        let html = `
      <h3>堂數資訊</h3>
      <table>
        <tr><td>姓名</td><td>${name}</td></tr>
        <tr><td>繳費日</td><td>${payment_date || "-"}</td></tr>
        <tr><td>到期日</td><td>${expiration_date || "-"}</td></tr>
        <tr><td>總堂數</td><td>${total_lessons || 0}</td></tr>
        <tr><td>已上課堂數</td><td>${attended_lessons || 0}</td></tr>
        <tr><td>剩餘堂數</td><td>${remaining_lessons || 0}</td></tr>
      </table>
    `

        // 產生 12 格橫向的出席表格
        html += `<h3>出席紀錄</h3><table border="1"><tr>`
        for (let i = 1; i <= 12; i++) {
            html += `<th>${i}</th>`
        }
        html += `</tr><tr>`
        for (let i = 0; i < 12; i++) {
            html += `<td>${attendance_record[i] || ""}</td>`
        }
        html += `</tr></table>`

        resultDiv.innerHTML = html
    } catch (err) {
        resultDiv.textContent = "查無資料，請確認輸入是否正確"
    }
}

