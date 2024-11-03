import getJSON from './getJSON.js'

const serverSettings = getJSON('../data/serverSettings.json')

export default function setServerSettings (server) {
  Object.keys(serverSettings).forEach(key => {
    if (key in server) {
      server[key] = serverSettings[key]
    }
  })
}
