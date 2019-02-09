import React from 'react'; 

const addItem = (props) => {
  if(props.itemClicked===false)
    return (
      <button 
        onClick={() => props.onAddItemClicked()}
        style={{ fontSize: '17px'}}
        className="btn btn-outline-dark w-100 m-0 mt-2 shadow"> Add a field</button>
    )

  return (
      <form className="form-inline">
        <div className="container">
          <div className="row mt-2">
            <button 
              onClick={() => props.onTextClicked()}
              style={{fontSize: '12px'}}
              className="col btn btn-outline-success btn-sm" type="button">Text</button>
            <button 
            onClick={() => props.onListClicked()}
            style={{fontSize: '12px'}}
            className="col btn btn-sm btn-outline-secondary" type="button">List</button>
          </div>
        </div>
      </form>
  )
}

export default addItem; 