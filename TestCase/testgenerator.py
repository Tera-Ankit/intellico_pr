import os
import esprima
import esprima
print("Esprima imported successfully!")
import random
from pathlib import Path

def extract_functions(js_code):
    """
    Extracts function names and their parameters from JavaScript code.
    """
    try:
        parsed = esprima.parseScript(js_code, tolerant=True)
        functions = []

        for node in parsed.body:
            if node.type == "FunctionDeclaration":
                func_name = node.id.name
                params = [param.name for param in node.params]
                functions.append({"name": func_name, "params": params})
        return functions

    except Exception as e:
        print(f"Error parsing JavaScript: {e}")
        return []

def generate_test_values(func_name, params):
    """
    Generate random test values for function parameters.
    """
    test_values = []
    for param in params:
        if param in ['a', 'b']:  # Assuming the function takes numbers for basic arithmetic
            test_values.append(random.randint(1, 100))  # Numeric values
        else:
            test_values.append('invalid')  # Invalid value for non-numeric parameters
    return test_values

def generate_unit_test(func_name, params):
    """
    Generates a Jest-based unit test for a given function.
    """
    # Generate test values for valid and invalid inputs
    valid_values = generate_test_values(func_name, params)
    invalid_values = generate_test_values(func_name, params)

    # Expected output: Handling basic arithmetic here (you can expand this logic)
    if func_name == 'add':
        expected_valid_output = valid_values[0] + valid_values[1]
    elif func_name == 'subtract':
        expected_valid_output = valid_values[0] - valid_values[1]
    else:
        expected_valid_output = 'undefined'

    # Generate unit tests
    test_case = f"""
describe('{func_name}', () => {{
    it('should handle valid inputs', () => {{
        // Arrange
        const result = {func_name}({', '.join(map(str, valid_values))});
        
        // Assert
        expect(result).toBe({expected_valid_output});
    }});

    it('should handle invalid inputs', () => {{
        // Arrange
        const result = {func_name}({', '.join(map(str, invalid_values))});

        // Assert
        expect(result).toBe();
    }});
}});
"""
    return test_case

def generate_test_file(js_file_path, output_dir="tests"):
    """
    Generate unit tests for a JavaScript file and write them to the output directory.
    """
    # Read the JavaScript file
    try:
        with open(js_file_path, "r") as js_file:
            js_code = js_file.read()
    except FileNotFoundError:
        print("JavaScript file not found!")
        return

    # Extract functions
    functions = extract_functions(js_code)
    if not functions:
        print("No functions found in the JavaScript file.")
        return

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Dynamically generate the require path
    file_name = Path(js_file_path).stem  # Extract the file name without extension
    relative_path_to_src = os.path.relpath(Path(js_file_path).parent, start=output_dir).replace("\\", "/")

    # Create the test file
    test_file_name = f"{file_name}.test.js"
    test_file_path = os.path.join(output_dir, test_file_name)

    try:
        with open(test_file_path, "w") as test_file:
            # Add dynamic require statement
            test_file.write(f"const {{ {', '.join([func['name'] for func in functions])} }} = require('{relative_path_to_src}/{file_name}');\n\n")

            # Generate and write tests for each function
            for func in functions:
                test_case = generate_unit_test(func["name"], func["params"])
                test_file.write(test_case)

        print(f"Test cases generated at: {test_file_path}")
    except Exception as e:
        print(f"Error writing test cases: {e}")

if __name__ == "__main__":
    js_file = input("Enter the path to the JavaScript file: ").strip()
    output_folder = input("Enter the output folder for test files (default: tests): ").strip() or "tests"
    generate_test_file(js_file, output_folder)