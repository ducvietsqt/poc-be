

(async () => {
  try {
    require('./user')()
    require('./spin')()
  }
  catch (err) {
    console.log(err)
  }
}
)()
