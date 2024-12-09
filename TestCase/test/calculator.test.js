const { add, subtract } = require('../src/calculator');


describe('add', () => {
    it('should handle valid inputs', () => {
        // Arrange
        const result = add(12, 37);
        
        // Assert
        expect(result).toBe(49);
    });

    it('should handle invalid inputs', () => {
        // Arrange
        const result = add(27, 98);

        // Assert
        expect(result).toBe();
    });
});

describe('subtract', () => {
    it('should handle valid inputs', () => {
        // Arrange
        const result = subtract(49, 64);
        
        // Assert
        expect(result).toBe(-15);
    });

    it('should handle invalid inputs', () => {
        // Arrange
        const result = subtract(28, 15);

        // Assert
        expect(result).toBe();
    });
});
