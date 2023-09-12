import { json } from 'co-body'

export async function createCustomer(ctx:Context, next: () => Promise<any>) {
    try {
        const body = await json(ctx.req)
       // console.log(body)
        const { clients: { customer } } = ctx
        const resp = await customer.createCustomerData(body)
        if (resp.data) {
            console.log("Saved!")
        }
        ctx.status = 200
        return next()
    }catch(e) { 
        const err: any = e
        const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
        ctx.status = err?.response?.status || 400
        ctx.body = message
        return next()
    }
}