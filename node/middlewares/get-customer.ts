export async function getCustomer(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
        },
        clients: { customer },
    } = ctx
    const data = await customer.getCustomerData()
    ctx.body=data
    await next()
}