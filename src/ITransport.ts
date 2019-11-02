import Logger from "./Logger";


export default interface ITransport {

    getLogLevel(): string | undefined;

    log(level: string, infoObject: object | string): Promise<any>;

    setLogger(logger: Logger): void;
}
