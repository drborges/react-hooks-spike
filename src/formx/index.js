import { useState } from "react"

const validate = (value, validators) => {
  const results = validators.map(validator => validator(value))
  return Promise.all(results)
}

const useField = form => (initialValue, { validators = [] }) => {
  const [error, setError] = useState(null)
  const [value, setValue] = useState(initialValue)
  const doValidate = value => {
    return validate(value, validators)
      .then(() => setError(""))
      .catch(hint => {
        setError(hint)
        throw hint
      })
  }
  
  const onChange = e => {
    setValue(e.target.value)
    doValidate(e.target.value)
      .catch(hint => console.warn(hint))
  }
  
  let validation
  if (error === "") validation = "valid"
  else if (error === null) validation = "prestine"
  else validation = "invalid"
  
  const field = {
    value,
    error,
    isValid: () => error === null || error === "",
    validate: () => doValidate(value),
    onChange,
    validation,
  }
  
  form.register(field)
  
  return field
}

// const useFields = form => (initialValue = [], config) => {
//   const [fields, setFields] = useState()
//   return {
//     fields: initialValue.map(value => useField(fields)(value, config)),
//     add: addField,
//     remove: removeField,
//   }
// }

export const useForm = () => {
  const [formFields, setFormFields] = useState([])
  const register = field => {
    setFormFields(formFields.concat(field))
  }
  
  const form = {
    register,
  }
  
  const onSubmit = handleSubmit => event => {
    event.preventDefault()
    const results = fields.map(field => field.validate())
    Promise.all(results)
           .then(() => handleSubmit(event))
           .catch(hint => alert(hint))
  }

  return {
    useField: useField(form),
//     useFields: useFields(form),
    onSubmit,
  }
}