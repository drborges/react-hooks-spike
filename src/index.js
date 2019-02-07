import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "./formx";
import { required } from "./validators"

import "./styles.css";

function App() {
  const { useField, onSubmit } = useForm()
  const name = useField("Diego", { validators: [required] })
  const surname = useField("Borges", { validators: [required] })
  const email = useField("drborges.cic@gmail.com", { validators: [required] })
//   const fruits = useFields([], { validators: [atLeastOne] })

  const handleSubmit = () => {
    alert("submitting form...")
  }
  
  return (
    <div className="App">
      <form onSubmit={onSubmit(handleSubmit)}>
        <div>
          <input placeholder="Name" {...name} className={name.validation} />
          {!name.isValid() && (
            <div>Error! {name.error}</div>
          )}
        </div>
        {/**
        <div>
          <input placeholder="Surname" {...surname} className={surname.validation} />
          {!surname.isValid() && (
            <div>Error! {surname.error}</div>
          )}
        </div>
        <div>
          <input placeholder="Email" {...email} className={email.validation} />
          {!email.isValid() && (
            <div>Error! {email.error}</div>
          )}
        </div>
        <div>
          {fruits.value.map(field => (
            <input {...field} className={field.validation} />
          ))}
        </div>
        **/}
        
        <button>Save</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
