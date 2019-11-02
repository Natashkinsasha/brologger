import Transport, { TransportOptions } from "./Transport";
export interface Colors {
    [key: string]: string;
}
export interface ConsoleTransportOptions extends TransportOptions {
    colors?: Colors;
}
export default class ConsoleTransport extends Transport {
    private readonly colors;
    constructor(options?: Partial<ConsoleTransportOptions>);
    log(level: string, infoObject: object): Promise<any>;
    protected getColorMessageByLevel(message: string, level: string): string;
}
