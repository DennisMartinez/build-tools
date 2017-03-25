module.exports = (gulp, tasks, $, server) => {
  tasks.forEach(name => {
    require('./tasks/' + name)(gulp, $, server)
  })
}
