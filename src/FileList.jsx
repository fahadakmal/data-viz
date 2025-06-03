import React, { useState } from 'react';

function FileList({ files, onSelectionChange }) {
  const [selections, setSelections] = useState(
    files.map(() => ({ x: '', y: [] }))
  );

  const handleXChange = (fileIdx, xCol) => {
    const newSelections = selections.map((sel, idx) =>
      idx === fileIdx ? { ...sel, x: xCol } : sel
    );
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const handleYChange = (fileIdx, yCol) => {
    const newSelections = [...selections];
    const ySet = new Set(newSelections[fileIdx].y);
    if (ySet.has(yCol)) {
      ySet.delete(yCol);
    } else {
      ySet.add(yCol);
    }
    newSelections[fileIdx].y = Array.from(ySet);
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  return (
    <div>
      {/* <p style={{ fontSize: 12, color: '#555' }}>
  Selected X: {selections[idx].x || 'None'}, Y: {selections[idx].y.join(', ') || 'None'}
</p> */}
      {files.map((file, idx) => (
        <div key={file.name} style={{ marginBottom: 20, border: '1px solid #eee', padding: 10 }}>
          <strong>{file.name}</strong>
          <div>
            <label>X-axis: </label>
            <select
              value={selections[idx].x}
              onChange={e => handleXChange(idx, e.target.value)}
            >
              <option value="">Select column</option>
              {file.fields.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Y-axis: </label>
            {file.fields.map(col => (
              <label key={col} style={{ marginRight: 10 }}>
                <input
                disabled={!selections[idx].x || col === selections[idx].x}
                  type="checkbox"
                  checked={selections[idx].y.includes(col)}
                  onChange={() => handleYChange(idx, col)}
                />
                {col}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList; 