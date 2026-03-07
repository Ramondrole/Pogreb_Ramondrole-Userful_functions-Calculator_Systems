(function() {
    const inputNumber = document.getElementById('inputNumber');
    const baseFrom = document.getElementById('baseFrom');
    const baseTo = document.getElementById('baseTo');
    const convertBtn = document.getElementById('convertBtn');
    const resultDisplay = document.getElementById('resultDisplay');
    const errorDisplay = document.getElementById('errorDisplay');

    function isValidForBase(str, base) {
        if (str.length === 0) return false;
        const allowedChars = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
        const regex = new RegExp('^[' + allowedChars + ']+$', 'i');
        return regex.test(str);
    }

    function performConversion() {
        errorDisplay.style.display = 'none';
        resultDisplay.style.display = 'block';
        resultDisplay.classList.remove('error-message');

        let numberStr = inputNumber.value.trim();
        const fromBase = parseInt(baseFrom.value, 10);
        const toBase = parseInt(baseTo.value, 10);

        if (numberStr === '') {
            showError('✖ Введите число');
            return;
        }

        const originalStr = numberStr;

        if (!isValidForBase(numberStr, fromBase)) {
            showError(`✖ Число "${originalStr}" недопустимо для системы ${fromBase}`);
            return;
        }

        let parsedNumber;
        try {
            parsedNumber = parseInt(numberStr, fromBase);
        } catch (e) {
            showError('✖ Ошибка парсинга');
            return;
        }

        if (isNaN(parsedNumber)) {
            showError('✖ Не удалось распознать число');
            return;
        }

        const roundTrip = parsedNumber.toString(fromBase).toLowerCase();
        const inputLower = numberStr.toLowerCase();

        let result;
        try {
            result = parsedNumber.toString(toBase).toUpperCase();
        } catch (e) {
            showError('✖ Ошибка преобразования');
            return;
        }

        resultDisplay.textContent = result;
        resultDisplay.style.display = 'block';
    }

    function showError(msg) {
        errorDisplay.textContent = msg;
        errorDisplay.style.display = 'block';
        resultDisplay.style.display = 'none';
    }

    convertBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performConversion();
    });

    baseFrom.addEventListener('change', performConversion);
    baseTo.addEventListener('change', performConversion);

    inputNumber.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performConversion();
        }
    });

    window.addEventListener('load', function() {
        performConversion();
    });
})();