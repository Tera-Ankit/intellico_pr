import os
import esprima
import random
import string
from pathlib import Path


def extract_functions(js_code):
    """
    Extracts function names, parameters, and logic hints from JavaScript code.
    """
    try:
        parsed = esprima.parseScript(js_code, tolerant=True)
        functions = []

        for node in parsed.body:
            try:
                # Handle function declarations
                if node.type == "FunctionDeclaration":
                    func_name = node.id.name if hasattr(node.id, "name") else "unknown"
                    params = [param.name for param in node.params] if hasattr(node, "params") else []

                    # Analyze the function body for type hints
                    logic_hints = []
                    if hasattr(node.body, "body"):
                        for statement in node.body.body:
                            if statement.type == "IfStatement" and hasattr(statement, "range") and statement.range:
                                tokens = list(esprima.tokenize(js_code[statement.range[0]:statement.range[1]]))
                                if "typeof" in [t.value for t in tokens]:
                                    logic_hints.append("type_check")
                                if "isNaN" in [t.value for t in tokens]:
                                    logic_hints.append("numeric_check")

                    functions.append({"name": func_name, "params": params, "logic_hints": logic_hints})

            except Exception as e:
                print(f"Error processing node: {node}, {e}")
                continue

        return functions

    except Exception as e:
        print(f"Error parsing JavaScript: {e}")
        return []


def generate_test_values(params, logic_hints):
    """
    Generate test values based on parameter names and function logic hints.
    """
    test_values = []
    for param in params:
        if "numeric_check" in logic_hints or param.lower() in ['a', 'b', 'num', 'number']:
            test_values.append(random.randint(1, 100))  # Random integers
        elif "type_check" in logic_hints or param.lower() in ['str', 'string', 'text']:
            test_values.append(''.join(random.choices(string.ascii_letters, k=5)))  # Random string
        else:
            test_values.append(None)  # Default case for unknown types
    return test_values


def generate_unit_test(func_name, params, logic_hints):
    """
    Generates a Jest-based unit test for a given function.
    """
    valid_values = generate_test_values(params, logic_hints)
    invalid_values = ['invalid'] * len(params)

    test_case = f"""
describe('{func_name}', () => {{
    it('should handle valid inputs', () => {{
        const result = {func_name}({', '.join(map(repr, valid_values))});
        expect(result).toBeDefined();
    }});

    it('should handle invalid inputs', () => {{
        const result = {func_name}({', '.join(map(repr, invalid_values))});
        expect(result).toBeUndefined();
    }});
}});
"""
    return test_case


def generate_test_file(js_file_path, output_dir="tests"):
    """
    Generate unit tests for a JavaScript file and write them to the output directory.
    """
    try:
        with open(js_file_path, "r") as js_file:
            js_code = js_file.read()
    except FileNotFoundError:
        print(f"JavaScript file not found: {js_file_path}")
        return

    functions = extract_functions(js_code)
    if not functions:
        print(f"No functions found in the JavaScript file: {js_file_path}")
        return

    os.makedirs(output_dir, exist_ok=True)
    file_name = Path(js_file_path).stem
    relative_path_to_src = os.path.relpath(Path(js_file_path).parent, start=output_dir).replace("\\", "/")

    test_file_name = f"{file_name}.test.js"
    test_file_path = os.path.join(output_dir, test_file_name)

    try:
        with open(test_file_path, "w") as test_file:
            test_file.write(f"const {{ {', '.join([func['name'] for func in functions])} }} = require('{relative_path_to_src}/{file_name}');\n\n")
            for func in functions:
                test_case = generate_unit_test(func["name"], func["params"], func["logic_hints"])
                test_file.write(test_case)
        print(f"Test cases generated at: {test_file_path}")
    except Exception as e:
        print(f"Error writing test cases: {e}")


def process_folder(folder_path, output_dir="tests"):
    """
    Generate test cases for all JavaScript files in a folder.
    """
    js_files = list(Path(folder_path).rglob("*.js"))
    if not js_files:
        print(f"No JavaScript files found in the folder: {folder_path}")
        return

    for js_file in js_files:
        generate_test_file(js_file, output_dir)


if __name__ == "__main__":
    path = input("Enter the path to the JavaScript file or folder: ").strip()
    output_folder = input("Enter the output folder for test files (default: tests): ").strip() or "tests"

    if os.path.isdir(path):
        process_folder(path, output_folder)
    elif os.path.isfile(path) and path.endswith(".js"):
        generate_test_file(path, output_folder)
    else:
        print("Invalid path. Please provide a valid JavaScript file or folder.")