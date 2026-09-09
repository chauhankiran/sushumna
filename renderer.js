document.addEventListener("DOMContentLoaded", () => {
    const resizer = document.getElementById("resizer");
    const sidePanel = document.getElementById("side-panel");
    const frame = document.getElementById("frame");

    if (!resizer || !sidePanel || !frame) return;

    let isDragging = false;

    resizer.addEventListener("mousedown", () => {
        isDragging = true;
        document.body.style.cursor = "col-resize";
        resizer.classList.add("dragging");
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const frameRect = frame.getBoundingClientRect();
        let newWidth = e.clientX - frameRect.left;

        // Constraints: Min 50px, Max width is the frame width minus 100px
        const minWidth = 50;
        const maxWidth = frameRect.width - 100;

        if (newWidth < minWidth) {
            newWidth = minWidth;
        } else if (newWidth > maxWidth) {
            newWidth = maxWidth;
        }

        sidePanel.style.width = `${newWidth}px`;
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = "";
            resizer.classList.remove("dragging");
            document.body.style.userSelect = "";
        }
    });

    // Reset to initial 15% width on double click
    resizer.addEventListener("dblclick", () => {
        sidePanel.style.width = "15%";
    });
});
