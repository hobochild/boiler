export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const redirect = path => {
  return ({ res, req }) => {
    res.setHeader('location', path)
    res.statusCode = 302
    res.end()
  }
}
