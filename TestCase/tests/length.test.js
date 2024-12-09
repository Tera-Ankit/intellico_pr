const { lengthOfString, toUpperCase } = require('../src/string/length');


describe('lengthOfString', () => {
    it('should handle valid inputs', () => {
        const result = lengthOfString('pdvXh');
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = lengthOfString('invalid');
        expect(result).toBeUndefined();
    });
});

describe('toUpperCase', () => {
    it('should handle valid inputs', () => {
        const result = toUpperCase('UrABN');
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = toUpperCase('invalid');
        expect(result).toBeUndefined();
    });
});
