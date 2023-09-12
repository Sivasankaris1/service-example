import { json } from 'co-body'

export async function updateCustomer(ctx:Context, next: () => Promise<any>) {
    try {
        const { id } = ctx.vtex.route.params
        const body = await json(ctx.req)
        const { clients: { customer } } = ctx
        const resp = await customer.updateCustomerData(body,id.toString())
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