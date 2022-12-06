export function stringToBoolean(string) {
  return string === 'false' ? false : !!string
}

export function transformNodeFormErrorsToVeeValidate(errors) {
  const result = {}

  errors.forEach((error) => {
    result[error.param] = []
    result[error.param].push(error.msg)
  })

  return result
}
