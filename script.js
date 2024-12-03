// DOM elements
const display = document.getElementById('display');
const buttonsContainer = document.getElementById('buttons');

// Create buttons dynamically for digits and operations
const buttonLayout = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
];

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle keypress events for numbers and operations
function handleButtonClick(value) {
    const currentDisplay = display.textContent;

    if (value === "=") {
        // Evaluate the expression on the display
        try {
            const result = eval(currentDisplay);
            updateDisplay(result);
        } catch (error) {
            alert('Invalid expression');
            updateDisplay('0');
        }
    } else if (value === 'C') {
        // Clear the display
        updateDisplay('0');
    } else {
        // If current display is 0, replace it with the new value
        if (currentDisplay === '0') {
            updateDisplay(value);
        } else {
            updateDisplay(currentDisplay + value);
        }
    }
}

// Generate calculator buttons dynamically using DOM
function createCalculatorButtons() {
    buttonLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('d-flex');
        
        row.forEach(buttonValue => {
            const button = document.createElement('button');
            button.textContent = buttonValue;
            button.classList.add('btn', 'btn-outline-secondary', 'btn-custom');
            
            // Add event listener for button click
            button.addEventListener('click', () => handleButtonClick(buttonValue));
            
            rowDiv.appendChild(button);
        });
        
        buttonsContainer.appendChild(rowDiv);
    });

    // Add a Clear button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'C';
    clearButton.classList.add('btn', 'btn-danger', 'btn-custom');
    clearButton.addEventListener('click', () => updateDisplay('0'));
    buttonsContainer.appendChild(clearButton);
}

// Add event listener for keyboard input (for numbers only)
document.addEventListener('keydown', function (event) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter'];
    
    if (!allowedKeys.includes(event.key)) {
        alert('Only numbers are allowed');
        return;
    }

    // Handle enter key for evaluation
    if (event.key === 'Enter') {
        handleButtonClick('=');
    } else {
        handleButtonClick(event.key);
    }
});

// Initializing the calculator
createCalculatorButtons();
// Handle memory operations using localStorage
function memoryOperation(operation) {
    let memory = localStorage.getItem('memory') || '0';
    if (operation === 'M+') {
        memory = (parseFloat(memory) + parseFloat(display.textContent)).toString();
    } else if (operation === 'M-') {
        memory = (parseFloat(memory) - parseFloat(display.textContent)).toString();
    } else if (operation === 'MC') {
        memory = '0';
    }
    localStorage.setItem('memory', memory);
    updateDisplay(memory);
}

// Add memory buttons
const memoryButtons = ['M+', 'M-', 'MC'];

memoryButtons.forEach(memBtn => {
    const button = document.createElement('button');
    button.textContent = memBtn;
    button.classList.add('btn', 'btn-info', 'btn-custom');
    button.addEventListener('click', () => memoryOperation(memBtn));
    buttonsContainer.appendChild(button);
});
