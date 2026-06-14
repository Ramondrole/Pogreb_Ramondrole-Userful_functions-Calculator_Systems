const systemsTranslations = {
    ru: {
        title: "◈ СЧИСЛЕНИЯ ◈",
        enterNumber: "✜ введите число",
        fromSystem: "⬇ из системы",
        toSystem: "⬆ в систему",
        convertBtn: "#ПЕРЕВЕСТИ",
        result: "🔷 РЕЗУЛЬТАТ 🔷",
        errorInvalidNumber: "✖ Число \"{num}\" недопустимо для системы {base}",
        errorParse: "✖ Ошибка парсинга",
        errorConvert: "✖ Ошибка преобразования",
        enterNumberMsg: "✖ Введите число",
        about: "Обо мне",
        games: "Наши игры",
        functions: "Полезные функции"
    },
    en: {
        title: "◈ NUMBER SYSTEMS ◈",
        enterNumber: "✜ enter number",
        fromSystem: "⬇ from system",
        toSystem: "⬆ to system",
        convertBtn: "#CONVERT",
        result: "🔷 RESULT 🔷",
        errorInvalidNumber: "✖ Number \"{num}\" is invalid for base {base}",
        errorParse: "✖ Parsing error",
        errorConvert: "✖ Conversion error",
        enterNumberMsg: "✖ Enter a number",
        about: "About me",
        games: "Our games",
        functions: "Useful functions"
    },
    de: {
        title: "◈ ZAHLENSYSTEME ◈",
        enterNumber: "✜ Zahl eingeben",
        fromSystem: "⬇ von System",
        toSystem: "⬆ zu System",
        convertBtn: "#UMWANDELN",
        result: "🔷 ERGEBNIS 🔷",
        errorInvalidNumber: "✖ Zahl \"{num}\" ist ungültig für Basis {base}",
        errorParse: "✖ Parse-Fehler",
        errorConvert: "✖ Konvertierungsfehler",
        enterNumberMsg: "✖ Geben Sie eine Zahl ein",
        about: "Über mich",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen"
    }
};

let currentLang = localStorage.getItem('systems_language') || 'ru';

function t(key, replacements = {}) {
    let text = systemsTranslations[currentLang]?.[key] || systemsTranslations.ru[key];
    for (const [k, v] of Object.entries(replacements)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
}

function updateSystemsUILanguage() {
    const elements = ['title', 'enterNumber', 'fromSystem', 'toSystem', 'convertBtn', 'result'];
    elements.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.textContent = t(key);
    });
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
        langBtn.innerHTML = flags[currentLang];
    }
    
    document.querySelectorAll('.nav-links a').forEach((link, idx) => {
        const keys = ['about', 'games', 'functions'];
        if (idx < keys.length) link.textContent = t(keys[idx]);
    });
}

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
    const fromBaseVal = parseInt(baseFrom.value, 10);
    const toBaseVal = parseInt(baseTo.value, 10);

    if (numberStr === '') {
        showError(t('enterNumberMsg'));
        return;
    }

    const originalStr = numberStr;

    if (!isValidForBase(numberStr, fromBaseVal)) {
        showError(t('errorInvalidNumber', { num: originalStr, base: fromBaseVal }));
        return;
    }

    let parsedNumber;
    try {
        parsedNumber = parseInt(numberStr, fromBaseVal);
    } catch (e) {
        showError(t('errorParse'));
        return;
    }

    if (isNaN(parsedNumber)) {
        showError(t('errorParse'));
        return;
    }

    let result;
    try {
        result = parsedNumber.toString(toBaseVal).toUpperCase();
    } catch (e) {
        showError(t('errorConvert'));
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

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('systems_language', lang);
    updateSystemsUILanguage();
    performConversion();
}

document.querySelectorAll('.lang-dropdown a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (lang) changeLanguage(lang);
    });
});

updateSystemsUILanguage();
performConversion();