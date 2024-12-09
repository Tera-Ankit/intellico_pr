const { add, subtract } = require('../src/utils/sample');


describe('add', () => {
    it('should handle valid inputs', () => {
        const result = add(60, 98);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = add('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});

describe('subtract', () => {
    it('should handle valid inputs', () => {
        const result = subtract(57, 55);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = subtract('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});
