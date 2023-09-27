export async function getContact(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
        },
        clients: { contact },
    } = ctx
    const data = await contact.getContactData()
    ctx.body=data
    await next()
}

export async function getContactByScroll(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
        },
        clients: { contact },
    } = ctx
    const data = await contact.getContactDataByScroll()
    ctx.body=data
    await next()
}