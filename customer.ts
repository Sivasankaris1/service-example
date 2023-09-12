import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Customer extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
          ...options,
        })
    }

    public async createCustomerData(payload: any){
        console.log("apyload" + payload)
        const savedData = await this.http.post<Promise<any>>(
            `/api/dataentities/CL/documents`,payload
        )
        console.log("saved" + savedData)
        if (savedData) {
            return {
              success: true
            }
        } else {
            return savedData
        }
    }

    public async getCustomerData() {
        const customerData = await this.http.get<Promise<any>>(
            `/api/dataentities/Client/Search?_fields=name,email`
        )
        return customerData
    }

    public async updateCustomerData(payload: any, id: string) {
        const updateCustomerData = await this.http.patch<Promise<any>>(
          `/api/dataentities/Client/documents/${id}`, payload
        )
        if (updateCustomerData) {
          return {
            success: true
          }
        } else {
          return updateCustomerData
        }
    }

    public async deleteCustomerData(id:string) {
        const deleteData = await this.http.delete<Promise<any>>(
            `/api/dataentities/Client/documents/${id}`
        )
        return deleteData
    }
}