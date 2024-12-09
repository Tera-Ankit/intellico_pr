const { lengthOfString, toUpperCase } = require('../src/string/length');


describe('lengthOfString', () => {
    it('should handle valid inputs', () => {
        const result = lengthOfString('HtRQB');
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = lengthOfString('invalid');
        expect(result).toBeUndefined();
    });
});

describe('toUpperCase', () => {
    it('should handle valid inputs', () => {
        const result = toUpperCase('nLhfl');
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = toUpperCase('invalid');
        expect(result).toBeUndefined();
    });
});
