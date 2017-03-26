module.exports = (gulp, tasks, $, server, proxyServer) => {
  tasks.forEach(name => {
    require('./tasks/' + name)(gulp, $, server, proxyServer)
  })
}
