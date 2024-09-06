interface Config {
    apiUrl: string
    apiKey: string
}

declare module 'config' {
    const config: Config
    export default config
}
