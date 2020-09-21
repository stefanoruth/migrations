export function runCommand(handler: () => Promise<any>) {
    return handler()
        .then(() => {
            console.log('Done')
        })
        .catch(err => {
            console.error(err)
        })
}
