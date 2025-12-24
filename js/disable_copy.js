/**
 * Coping is prohibited.
 *
 * @author lsl
 * @createdTime 2025-12-25 01:01
 */


// 1. 禁用右鍵選單
document.addEventListener('contextmenu', e => e.preventDefault())

// 2. 禁用 Ctrl+C, Ctrl+U (檢視原始碼), Ctrl+S (存檔)
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
    }
})
