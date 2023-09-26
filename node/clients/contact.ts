import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient , Apps } from '@vtex/api'

export default class Contact extends ExternalClient {
    private setting: any | boolean = false
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
          ...options,
        })
    }

    public async createContactData(payload: any){
        console.log("in create contact")
        //const data = JSON.stringify(payload)
        const saveContactData = await this.http.post<Promise<any>>(
            `/api/dataentities/SC/documents`,payload,
            await this.getHeaders()
        )
        console.log("saved" + JSON.stringify(saveContactData))
        if (saveContactData) {
            return {
              success: true,
              message: "Data saved",
              data: saveContactData
            }
        } else {
            return {
                success: false,
                message: "Error in saving data"
            }
        }
    }

    public async getContactData() {
        const contactData = await this.http.get<Promise<any>>(
            `/api/dataentities/SC/Search?_fields=id,name,email,subject,message,file&_schema=contactSchema`,
            await this.getHeaders()
        )
        return contactData
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

    public async getCaptcha() {
        const App = new Apps(this.context)
        this.setting = await App.getAppSettings(process.env.VTEX_APP_ID ?? '')
        return {
            siteKey : this.setting?.recaptchaKey
        }
    }
    
}
