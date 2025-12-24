const iframe = document.getElementById("pdfViewer");

document.querySelectorAll(".buttonBox").forEach(box => {
    box.addEventListener("click", () => {
        iframe.src = box.dataset.pdf;
    });
});