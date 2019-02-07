export const required = value => {
  return new Promise((resolve, reject) => {
    if (value !== undefined && value !== null && value !== "") {
      resolve(value)
    } else {
      reject("cannot be blank")
    }
  })
}
