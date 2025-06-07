document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    // Variable to track if the last operation resulted in an error
    let isErrorState = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            // If the display is in an error state, any button press (except 'C') should clear it first.
            if (isErrorState && value !== 'C') {
                display.value = '';
                isErrorState = false;
            }

            switch (value) {
                case 'C':
                    // Clear the display
                    display.value = '';
                    isErrorState = false;
                    break;
                case 'DEL':
                    // Delete the last character
                    display.value = display.value.slice(0, -1);
                    break;
                case '=':
                    // Evaluate the expression
                    try {
                        // Replace visual operators with functional ones for eval()
                        let expression = display.value
                            .replace(/×/g, '*')
                            .replace(/÷/g, '/')
                            .replace(/%/g, '/100*');
                        
                        // Security check: only allow valid characters for a calculator
                        if (/[^0-9\.\+\-\*\/ \(\)]/.test(expression)) {
                           throw new Error("Invalid characters in expression");
                        }

                        // Use eval() to calculate the result
                        const result = eval(expression);

                        // Handle cases like 1/0 = Infinity
                        if (!isFinite(result)) {
                            throw new Error("Cannot divide by zero");
                        }
                        
                        display.value = result;

                    } catch (error) {
                        display.value = 'Error';
                        isErrorState = true;
                    }
                    break;
                default:
                    // Append the clicked button's value to the display
                    display.value += value;
                    break;
            }
        });
    });
});