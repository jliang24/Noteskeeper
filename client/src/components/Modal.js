import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div style={{position:'absolute', top:0, left:'40%'}}>
      <div onClick={() => props.onDismiss()} style={{opacity:0.5, zIndex:2}} className="modal-backdrop"></div>
      <div style={{marginTop:'-60px', zIndex: 3, width:'600px'}}  className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
        </div>
        <div className="modal-body">
          {props.content}
        </div>
        <div className="modal-footer">
          <button onClick={() => props.onDismiss()} type="button" className="btn btn-secondary">Close</button>
          <button onClick={() => props.onSave()} type="submit" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
    , 
    document.querySelector('#modal')
  )
}

export default Modal; 