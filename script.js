const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

function isOperator(ch) {
    return ["+", "-", "*", "/"].includes(ch);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "C") {
            display.value = "";
            return;
        }

        if (value === "=") {
            try {
                // Evaluate safely for simple arithmetic
                const result = Function('return (' + display.value + ')')();
                display.value = String(result);
            } catch (e) {
                display.value = "Error";
            }
            return;
        }

        // Prevent two operators in a row (except allow leading minus)
        const last = display.value.slice(-1);
        if (isOperator(value)) {
            if (display.value === "" && value === "-") {
                display.value += value; // allow negative numbers
                return;
            }
            if (display.value === "" || isOperator(last)) {
                // replace last operator with new one
                if (display.value !== "") {
                    display.value = display.value.slice(0, -1) + value;
                }
                return;
            }
        }

        // Handle decimal: allow only one decimal per number segment
        if (value === ".") {
            const parts = display.value.split(/[-+*/]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) return;
        }

        display.value += value;
    });
});