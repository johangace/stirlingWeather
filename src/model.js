import { Component } from 'react'

export default class Listeners {
  //   static listeners: {  }
  //   static properties: { }
  static AddListener(property, callback) {
    if (!this.listeners) {
      this.listeners = {}
    }
    if (!this.listeners[property]) {
      this.listeners[property] = []
    }
    this.listeners[property].push(callback)
  }
  static GetProperty(property) {
    if (!this.properties || !this.properties[property]) {
      return ''
    }
    return this.properties[property]
  }

  static getPropertyForContext(property) {
    return localStorage.getItem(`${property}`)
  }
  static setPropertyForContext(property, newValue) {
    this.UpdateProperty(property, newValue)
    return localStorage.setItem(`${property}`, newValue)
  }

  static UpdateProperty(property, newValue) {
    if (!this.properties) {
      this.properties = {}
    }
    this.properties[property] = newValue
    if (!this.listeners || !this.listeners[property]) {
      return
    }
    let propertyListeners = this.listeners[property]
    for (let i = 0; i < propertyListeners.length; ++i) {
      try {
        propertyListeners[i](newValue)
      } catch {}
    }
  }
}
