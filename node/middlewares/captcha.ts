export async function getCaptcha(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
        },
        clients: { contact },
    } = ctx
    const data = await contact.getCaptcha()
    ctx.body=data
    await next()
}