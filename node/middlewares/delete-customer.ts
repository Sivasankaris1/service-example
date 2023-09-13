export async function deleteCustomer(ctx: Context, next: () => Promise<any>) {
    try{
     const { id } = ctx.vtex.route.params
     const { clients: { customer } } = ctx
     const data = await customer.deleteCustomerData(id.toString())
     ctx.body = data
     return next()
    }catch (err){
     const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
     ctx.status = err?.response?.status || 400
     ctx.body = message
     return next()
    }
 }