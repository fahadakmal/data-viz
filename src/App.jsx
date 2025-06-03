import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import D3Chart from './D3Chart';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [selections, setSelections] = useState([]);

  // useEffect(() => {
  //   const stored = localStorage.getItem('csvFiles');
  //   if (stored) {
  //     const parsed = JSON.parse(stored);
  //     setFiles(parsed);
  //     setSelections(parsed.map(() => ({ x: '', y: [] })));
  //   }
  // }, []);
  
  // useEffect(() => {
  //   if (files.length > 0) {
  //     localStorage.setItem('csvFiles', JSON.stringify(files));
  //   }
  // }, [files]);

  const handleFilesParsed = (parsedFiles) => {
    setFiles(parsedFiles);
    setSelections(parsedFiles.map(() => ({ x: '', y: [] })));
  };

  const handleSelectionChange = (newSelections) => {
    setSelections(newSelections);
  };

  return (
    <div className="App" style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>CSV Data Visualizer</h1>
      <FileUpload onFilesParsed={handleFilesParsed} />
      {files.length > 0 && (
        <>
          <FileList files={files} onSelectionChange={handleSelectionChange} />
          <D3Chart files={files} selections={selections} />
        </>
      )}
      <button onClick={() => { setFiles([]); setSelections([]); localStorage.removeItem('csvFiles'); }}>
  Clear All
</button>
    </div>
  );
}

export default App;
