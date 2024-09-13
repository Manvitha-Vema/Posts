   document.addEventListener("DOMContentLoaded", function() {
            console.log("Script loaded and DOM is ready!");
            const textarea = document.getElementById("textarea");
            const CountElement = document.getElementById("Count");
            if (textarea) {
                textarea.addEventListener("input", function() {
                    const Count = textarea.value.length;
                    const maxLength = textarea.getAttribute("maxlength");
                    CountElement.textContent = `${Count}/${maxLength} characters used`;
                });
            }
        });