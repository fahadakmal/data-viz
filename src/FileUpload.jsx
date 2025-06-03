import React, { useRef } from 'react';
import Papa from 'papaparse';

function FileUpload({ onFilesParsed }) {
  const fileInputRef = useRef();

  const handleFiles = (files) => {
    const parsedFiles = [];
    let filesProcessed = 0;
    Array.from(files).forEach((file) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          parsedFiles.push({
            name: file.name,
            data: results.data,
            fields: results.meta.fields,
          });
          filesProcessed++;
          if (filesProcessed === files.length) {
            // Save to localStorage
            // localStorage.setItem('csvFiles',parsedFiles);
            onFilesParsed(parsedFiles);
          }
        },
      });
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ border: '2px dashed #aaa', padding: 20, marginBottom: 10 }}
      >
        Drag & Drop CSV files here
      </div>
      <input
        type="file"
        accept=".csv"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onChange}
      />
      <button onClick={() => fileInputRef.current.click()}>Select CSV Files</button>
    </div>
  );
}

export default FileUpload; 