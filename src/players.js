import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


// export class Add extends Component {
//   render() {
//     return (
//         <div>    
          
//           <br/>

//           <button type="button">Add player</button>
//           <button type="button">Remove player</button>
//         </div>

//     );
//   }
// }


export class Add extends Component {
  name = '';
  form = null;

  render() {
    return (
      <form ref={(instance) => (this.form = instance)}>
        <input
          type="text"
          value={this.name}
          onChange={(event) => (this.name = event.currentTarget.value)}
          required
        />
        <br/><button type="button" onClick={this.buttonClicked}>
          Add player
        </button>
      </form>
    );
  }

  buttonClicked() {
    if (!this.form.reportValidity()) return;

    alert('Hello ' + this.name);
  }
}



// class CrudDivs extends Component {

//   renderCrudDiv(){
//     return (
//       React.createElement(
//         "div",
//         {className: "crud-card"},
//         "NewDiv",
//       )
//     )
//   }
// }  


