import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient , Apps } from '@vtex/api'

export default class Customer extends ExternalClient {
    private setting: any | boolean = false
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
          ...options,
        })
    }

    public async createCustomerData(payload: any){
        const savedData = await this.http.post<Promise<any>>(
            `/api/dataentities/SD/documents`,payload,
            await this.getHeaders()
        )
        console.log("saved" + savedData)
        if (savedData) {
            return {
              success: true,
              data: savedData
            }
        } else {
            return savedData
        }
    }

    public async getCustomerData() {
        const customerData = await this.http.get<Promise<any>>(
            `/api/dataentities/SD/Search?_fields=id,name,lname,Age,Subject&_schema=sankarischema`,
            await this.getHeaders()
        )
        return customerData
    }

    public async updateCustomerData(payload: any, id: string) {
        const updateCustomerData = await this.http.patch<Promise<any>>(
          `/api/dataentities/SD/documents/${id}`, payload,
          await this.getHeaders()
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
            `/api/dataentities/SD/documents/${id}`,
            await this.getHeaders()
        )
        return deleteData
    }

    private async getHeaders() {
        const App = new Apps(this.context)
        this.setting = await App.getAppSettings(process.env.VTEX_APP_ID ?? '')
        return {
            headers : {
                'Content-type': 'application/json',
                'X-VTEX-API-AppKey': this.setting?.apiKey,
                'X-VTEX-API-AppToken': this.setting?.appToken
            }
        }
    }
}