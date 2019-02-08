import React from 'react'; 

const addItem = (props) => {
  if(props.itemClicked===false)
    return (
      <button 
        onClick={() => props.onAddItemClicked()}
        className="btn btn-outline-dark w-100 m-0 mt-2"> Add an item</button>
    )

  return (
      <form className="form-inline">
        <div className="container">
          <div className="row mt-2">
            <button 
              onClick={() => props.onTextClicked()}
              className="col btn btn-outline-success btn-sm" type="button">Text</button>
            <button 
            onClick={() => props.onListClicked()}
            className="col btn btn-sm btn-outline-secondary" type="button">List</button>
          </div>
        </div>
      </form>
  )
}

export default addItem; 