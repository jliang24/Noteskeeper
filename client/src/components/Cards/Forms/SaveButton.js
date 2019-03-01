import React from 'react';

const saveButton = ({
  showText,
  showList,
  onDismiss,
  onSave = null,
  creation
}) => {
  const renderSaveButton = () => {
    if (onSave) {
      return (
        <button
          type="button"
          onClick={onSave}
          className="btn btn-success float-right btn-sm mb-1"
        >
          Save
        </button>
      );
    }
    return (
      <button type="submit" className="btn btn-success float-right btn-sm mb-0">
        SAVE
      </button>
    );
  };
  if (showText || showList) {
    return (
      <div style={{ height: '35px' }}>
        {renderSaveButton()}
        {creation || (
          <button
            onClick={() => onDismiss()}
            className="btn btn-danger float-left btn-sm mb-1"
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    );
  }
  return null;
};

export default saveButton;
