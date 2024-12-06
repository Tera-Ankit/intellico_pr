const { add, subtract } = require('../src/utils/sample');


describe('add', () => {
    it('should handle valid inputs', () => {
        const result = add(11, 7);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = add('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});

describe('subtract', () => {
    it('should handle valid inputs', () => {
        const result = subtract(29, 11);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = subtract('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});
