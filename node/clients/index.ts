import { IOClients } from '@vtex/api'
import Customer from './customer'
import Status from './status'
import Contact from './contact'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get customer() {
    return this.getOrSet('customer', Customer)
  }

  public get contact() {
    return this.getOrSet('contact', Contact)
  }
}
