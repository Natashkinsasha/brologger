import Logger from "./Logger";


export default interface ITransport {

    getLogLevel(): string | undefined;


    log(level: string, message?: string, infoObject?: object, meta?: object): Promise<any>;

    setLogger(logger: Logger): void;
}
