const { add, subtract } = require('../src/calculator');


describe('add', () => {
    it('should handle valid inputs', () => {
        // Arrange
        const result = add(25, 5);
        
        // Assert
        expect(result).toBe(30);
    });

    it('should handle invalid inputs', () => {
        // Arrange
        const result = add(4, 74);

        // Assert
        expect(result).toBe();
    });
});

describe('subtract', () => {
    it('should handle valid inputs', () => {
        // Arrange
        const result = subtract(53, 77);
        
        // Assert
        expect(result).toBe(-24);
    });

    it('should handle invalid inputs', () => {
        // Arrange
        const result = subtract(74, 9);

        // Assert
        expect(result).toBe();
    });
});
