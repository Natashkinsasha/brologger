import Logger from "./Logger";


export default interface ITransport {

    getLogLevel(): string | undefined;

    log(level: string, ...infoObjects: Array<object | string>): Promise<any>;

    setLogger(logger: Logger): void;
}
