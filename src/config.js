class Config {
  constructor (defaultConfig) {
    this.config = this.#loadConfig(defaultConfig)
    return new Proxy(this, {
        get: (target, prop) => this.#getConfig(prop),
        set: (target, prop, value) => this.#setConfig(prop, value)
    })
  }

  #loadConfig(config) {
    for (const key in localStorage) {
        if (key.startsWith('rg')) {
            config[key.slice(3)] = localStorage[key] === "false" ? false : localStorage[key]
        }
    }
    return config
  }

  #setConfig(name, value) {
    this.config[name] = value
    localStorage['rg-' + name] = value
    return true
  }

  #getConfig(name) {
    return this.config[name] 
  }    
}