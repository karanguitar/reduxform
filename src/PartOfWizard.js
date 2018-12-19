import React, { Component } from 'react';
import './App.css';
import {Field, reduxForm} from 'redux-form'

class PartOfWizard extends Component {
  render() {
    return (
      <div className="PartOfWizard">

      </div>
    );
  }
}

export default reduxForm({
  
  form: 'contact'
})(PartOfWizard)
