import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name); // Append the file with its original name
  
      try {
        const response = await axios.post('http://localhost:3001/upload', formData);
        console.log(response.data);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
