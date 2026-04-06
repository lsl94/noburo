function checkAnswers() {
    const questions = document.querySelectorAll(".question")

    questions.forEach(function(question) {
        const correct = question.getAttribute("data-answer")
        const selected = question.querySelector("input[type=\"radio\"]:checked")
        const result = question.querySelector(".result")

        if (!selected) {
            result.textContent = "未回答"
            result.style.color = "gray"
            return
        }

        if (selected.value === correct) {
            result.textContent = "正解！"
            result.style.color = "green"
        } else {
            result.textContent = "不正解"
            result.style.color = "red"
        }
    })
}
