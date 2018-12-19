import React, { Component } from 'react';
import './App.css';

import {Field, reduxForm, FieldArray} from 'redux-form'

class App extends Component {

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

  renderHobbies = ({ fields, meta: { error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
          Add Exercise
        </button>
      </li>
      {fields.map((exercise, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove exercise"
            onClick={() => fields.remove(index)}
          />
          <Field
            name={exercise}
            type="text"
            component={this.renderField}
            label={`Exercise #${index + 1}`}
          />
        </li>
      ))}
      {error && <li className="error">{error}</li>}
    </ul>
  )

  renderDay = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Day
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((day, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Day"
            onClick={() => fields.remove(index)}
          />
          <h4>Day #{index + 1}</h4>
          <Field
            name={`day.name.${index + 1}`}
            type="text"
            component={this.renderField}
            label="Day Name"
          />
          <FieldArray name={`${day}.exercise`} component={this.renderHobbies} />
        </li>
      ))}
    </ul>
  )

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className="App">
        <form onSubmit={handleSubmit}>

          <FieldArray name="days" component={this.renderDay} />
          <div>
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  
  form: 'sports',
  destroyOnUnmount: false
})(App)

