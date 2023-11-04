

// ...

const handleUpload = () => {
  if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:3001/upload', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('File upload failed:', error);
      });
  } else {
    alert('Please select a file to upload.');
  }
};
