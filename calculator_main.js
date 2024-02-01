var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        if (!isInputFieldFocused()) {
            handleKeyPress(this.innerHTML);
        }
    };
}

function handleKeyPress(btnVal) {
    var input = document.querySelector('.screen');
    var inputVal = input.innerHTML;

    if (btnVal == 'C') {
        input.innerHTML = '';
        decimalAdded = false;
    } else if (btnVal == '=') {
        var equation = inputVal;
        var lastChar = equation[equation.length - 1];

        equation = equation.replace(/x/g, '*').replace(/÷/g, '\\/');

        if (operators.indexOf(lastChar) > -1 || lastChar == '.')
            equation = equation.replace(/.$/, '');

        if (equation)
            input.innerHTML = eval(equation);

        decimalAdded = false;
    } else if (operators.indexOf(btnVal) > -1) {
        var lastChar = inputVal[inputVal.length - 1];

        if (inputVal != '' && operators.indexOf(lastChar) == -1)
            input.innerHTML += btnVal;
        else if (inputVal == '' && btnVal == '-')
            input.innerHTML += btnVal;

        if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
            input.innerHTML = inputVal.replace(/.$/, btnVal);
        }

        decimalAdded = false;
    } else if (btnVal == '.') {
        if (!decimalAdded) {
            input.innerHTML += btnVal;
            decimalAdded = true;
        }
    } else {
        input.innerHTML += btnVal;
    }
}


document.addEventListener('keydown', function (e) {
    if (!isInputFieldFocused()) {
        var key = e.key;
        if (!isNaN(key) || key === '.') {
            handleKeyPress(key);
        } else if (operators.indexOf(key) > -1 || key === '*') {
            handleKeyPress(key);
        } else if (key === '/') {
            handleKeyPress(key);
        } else if (key === 'Enter') {
            handleKeyPress('=');
        } else if (key === 'Backspace') {
            handleKeyPress('C');
        }

        e.preventDefault();
    }
});

function isInputFieldFocused() {
    var focusedElement = document.activeElement;
    return focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';
}
