import React from 'react'; 

const saveButton = ({showText, showList, onDismiss, onSave=null}) => {
  const renderSaveButton = () => {
    if (onSave){
      return (
        <button type="button" onClick={onSave} className="btn btn-success float-right btn-sm mb-0">Save</button>
      )
    }
    return (
      <button type="submit" className="btn btn-success float-right btn-sm mb-0">SAVE</button>
    )
  }
  if (showText || showList) {
    return(
      <React.Fragment>
        {renderSaveButton()}
        <button 
          onClick={()=> onDismiss()} 
          className="btn btn-danger float-left btn-sm mb-0" type="button"> 
          Cancel
        </button>
      </React.Fragment>
    )
  }
  return null 
}

export default saveButton; 