import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const ImageUploader = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    // Update the selected files state
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
  };
  const handleRemove = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  useEffect(() => {
    onUpload(selectedFiles);
  }, [selectedFiles, onUpload]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Images:</h2>
          <div style={{ display: "flex", flexFlow: "column" }}>
            {selectedFiles.map((file, index) => (
              <div key={index} style={{ margin: "5px" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index}`}
                  style={{ width: "100px", height: "70px" }}
                />
                 <ClearIcon
                  style={{
                    cursor: "pointer",
                    padding: "2px",
                    position: "relative",
                    bottom: "50px",

                  }}
                  onClick={() => handleRemove(index)}
                />
              </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
