declare module "node-stream-zip" {
    class StreamZip {
        constructor(options: any)

        entriesCount: number;

        extract: (pathInSide: string | null, outputPath: string, cb: (err: Error, count: number) => void) => void
        entries: () => any
        close: () => void
        on: (type: string, cb: (err?: Error) => void) => StreamZip
    }

    export = StreamZip
}