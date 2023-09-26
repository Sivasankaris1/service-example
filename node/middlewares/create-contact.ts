import { json } from 'co-body'

export async function createContact(ctx:Context, next: () => Promise<any>) {
    try {
        const body = await json(ctx.req)
        console.log("body" + JSON.stringify(body))
        const { clients: { contact } } = ctx
        const resp = await contact.createContactData(body)
        console.log("resp " + JSON.stringify(resp))
        // if (resp.data) {
            ctx.status = 200 
        // }
       
        return next()
    }catch(e) { 
        const err: any = e
        const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
        ctx.status = err?.response?.status || 400
        ctx.body = message
        return next()
    }
}