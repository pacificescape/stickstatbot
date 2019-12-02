const got = require('got')

module.exports = async (ctx) => {
  try {
    return got.post(`http://localhost:3000/api/setStats`, {
      body: ctx.state.data,
      json: true
    })
      .catch(error => console.log(error))
  } catch (error) {
    console.log(error)
  }
}
