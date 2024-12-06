import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./App.css";

function App() {
  const [folderPath, setFolderPath] = useState(""); // Store the folder path
  const [message, setMessage] = useState(""); // Display messages to the user

  // Handle changes in the text input for folder path
  const handleFolderChange = (event) => {
    setFolderPath(event.target.value); // Update the folder path state
  };

  // Handle folder selection using file input
  const handleFolderSelect = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      // Extract the folder path from the first file's relative path
      const relativePath = files[0].webkitRelativePath || "";
      const folderPath = relativePath.split("/")[0]; // Get the root folder name
      setFolderPath(folderPath); // Save the folder path
      setMessage(`Folder path selected: ${folderPath}`);
    } else {
      setMessage("No folder selected. Please try again.");
    }
  };

  // Handle submission of the folder path
  const handleSubmit = async () => {
    if (!folderPath) {
      setMessage("Please enter or select a folder path."); // Error message if no path is set
      return;
    }

    // Send the folder path to the FastAPI backend
    try {
      const response = await axios.post("http://127.0.0.1:8000/save-folder", {
        folderPath: folderPath, // Send the folder path in the request body
      });

      // Handle response
      setMessage(response.data.message || `Folder path saved: ${folderPath}`);
      console.log("Response from backend:", response.data); // For debugging purposes
    } catch (error) {
      console.error("Error sending folder path:", error);
      setMessage("An error occurred while saving the folder path.");
    }
  };

  return (
    <div className="App">
      <h1>Intellico</h1>

      {/* Manual Text Input for Folder Path */}
      <div className="folder-input">
        <label htmlFor="folder-path">Enter Folder Path:</label>
        <input
          type="text"
          id="folder-path"
          value={folderPath}
          onChange={handleFolderChange}
          placeholder="Enter the folder path here"
        />
      </div>

      {/* File Input to Select Folder */}
      <div className="folder-input">
        {/* The label "Or Select Folder" is no longer clickable */}
        <span>Or Select Folder:</span>
        <input
          type="file"
          id="folder-select"
          webkitdirectory="true"
          onChange={handleFolderSelect}
          style={{ display: "none" }} // Hide the input field
        />
      </div>

      {/* Button to trigger folder selection (use button to trigger the hidden file input) */}
      <button
        className="select-button"
        onClick={() => document.getElementById("folder-select").click()}
      >
        Select Folder
      </button>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>
        Save Folder Path
      </button>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;







// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [folderPath, setFolderPath] = useState("");
//   const [message, setMessage] = useState(""); // Success/Error messages
//   const [isFolderSelected, setIsFolderSelected] = useState(false); // Track if folder is selected
//   const [scripts, setScripts] = useState([]); // List of scripts in the folder
//   const [selectedScript, setSelectedScript] = useState(""); // Selected script to run

//   const handleFolderChange = (event) => {
//     setFolderPath(event.target.value);
//     setIsFolderSelected(false); // Reset folder selection state when user types
//   };

//   const handleFolderSelect = (event) => {
//     const selectedFolder = event.target.files[0];
//     if (selectedFolder) {
//       const folderName = selectedFolder.webkitRelativePath.split('/')[0];
//       setFolderPath(folderName); // Update folder path to the folder name
//       setIsFolderSelected(true); // Indicate that a folder is selected
//     }
//   };

//   const handleFolderSubmit = async () => {
//     if (!folderPath) {
//       setMessage("Please select or enter a folder path.");
//       return;
//     }
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/upload/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ folder_path: folderPath }), // Ensure folderPath is passed correctly
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message || "Scripts fetched successfully.");
//         setScripts(data.scripts || []); // Ensure scripts is an array
//       } else {
//         setMessage(data.detail || "Error fetching scripts.");
//         console.error("Error response:", data);
//       }
//     } catch (error) {
//       setMessage("An error occurred: " + error.message);
//       console.error("Fetch error:", error);
//     }
//   };
  
//   const handleScriptSubmit = async () => {
//     if (!selectedScript) {
//       setMessage("Please select a script to run.");
//       return;
//     }
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/run_script/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ script_name: selectedScript, folder_path: folderPath }), // Send both script_name and folder_path
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message || "Script ran successfully.");
//         console.log("Script Output:", data.output);
//       } else {
//         setMessage(data.error || "Error running script.");
//       }
//     } catch (error) {
//       setMessage("An error occurred: " + error.message);
//     }
//   };
  
//   // Message rendering
//   <p className="message">
//     {typeof message === "string" ? message : JSON.stringify(message)}
//   </p>
  
//   return (
//     <div className="App">
//       <h1>Intellico</h1>

//       <p>Choose one of the following methods to provide the folder path:</p>

//       <div className="folder-input">
//         <label htmlFor="folder-path">Enter Folder Path:</label>
//         <input
//           type="text"
//           id="folder-path"
//           value={folderPath}
//           onChange={handleFolderChange}
//           placeholder="Enter the folder path here"
//         />
//       </div>

//       <div className="folder-input">
//         <div className={`folder-select-label ${isFolderSelected ? 'inactive' : ''}`}>
//           <i className={`folder-icon ${isFolderSelected ? 'inactive-icon' : ''}`}>
//             &#128193;
//           </i>
//           <span className={`folder-text ${isFolderSelected ? 'inactive-text' : ''}`}>
//             Or Select Folder
//           </span>
//         </div>
//         <input
//           type="file"
//           id="folder-select"
//           webkitdirectory="true"
//           onChange={handleFolderSelect}
//           style={{ display: "none" }}
//         />
//         <button
//           onClick={() => document.getElementById("folder-select").click()}
//           className="select-button"
//           disabled={isFolderSelected}
//         >
//           Select Folder
//         </button>
//       </div>

//       {isFolderSelected && folderPath && (
//         <div className="folder-preview">
//           <p><strong>Selected Folder:</strong> {folderPath}</p>
//         </div>
//       )}

//       <button className="submit-button" onClick={handleFolderSubmit}>
//         Fetch Scripts from Folder
//       </button>

//       {scripts.length > 0 && (
//         <div>
//           <label>Select Script to Run:</label>
//           <select
//             value={selectedScript}
//             onChange={(e) => setSelectedScript(e.target.value)}
//           >
//             <option value="">Select a script</option>
//             {scripts.map((script, index) => (
//               <option key={index} value={script}>
//                 {script}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <button className="submit-button" onClick={handleScriptSubmit}>
//         Run Selected Script
//       </button>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default App;








