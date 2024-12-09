const { add, subtract } = require('../src/calculator');


describe('add', () => {
    it('should handle valid inputs', () => {
        const result = add(55, 53);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = add('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});

describe('subtract', () => {
    it('should handle valid inputs', () => {
        const result = subtract(62, 7);
        expect(result).toBeDefined();
    });

    it('should handle invalid inputs', () => {
        const result = subtract('invalid', 'invalid');
        expect(result).toBeUndefined();
    });
});
