import React, { useState } from 'react';
import './TextDisplay.css';

function TextDisplay({ text }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const wordCount = editedText.trim().split(/\s+/).length;
  const charCount = editedText.length;
  const lineCount = editedText.split('\n').length;

  return (
    <div className="text-display">
      <div className="text-stats">
        <span>📊 Words: {wordCount}</span>
        <span>📝 Characters: {charCount}</span>
        <span>📄 Lines: {lineCount}</span>
      </div>

      {isEditing ? (
        <div className="edit-mode">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="text-editor"
          />
          <button onClick={handleSaveEdit} className="btn-save">
            ✓ Save
          </button>
        </div>
      ) : (
        <>
          <div className="text-content">
            {editedText.split('\n').map((line, idx) => (
              <p key={idx}>{line || '\u00A0'}</p>
            ))}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit"
          >
            ✏️ Edit Text
          </button>
        </>
      )}
    </div>
  );
}

export default TextDisplay;
