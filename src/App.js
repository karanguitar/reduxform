import React from 'react';
import './App.css';

import {Field, reduxForm, FieldArray} from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


const renderDays = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add day
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((day, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove day"
          onClick={() => fields.remove(index)}
        />
        <h4>day #{index + 1}</h4>
        <Field
          name={`${day}.Name`}
          type="text"
          component={renderField}
          label="Day Name e.g. Leg Day 1"
        />
        <FieldArray name={`${day}.exercises`} component={renderExercise} />
      </li>
    ))}
  </ul>
)

const renderExercise = ({ fields, meta: { error } }) => (
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
        {console.log(exercise)}
        <Field
          name={exercise}
          
          type="text"
          component={renderField}
          label={`Exercise #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const App = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="days" component={renderDays} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  
  form: 'contact',
  destroyOnUnmount: false
})(App)

