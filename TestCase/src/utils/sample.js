function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return NaN;
    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return NaN;
    return a - b;
}

module.exports = { add, subtract };