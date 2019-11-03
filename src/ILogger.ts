import Log from "./ILog";


export default interface ILogger{

    message(message: string): Log;
    meta(meta: object): Log;
    object(object: object): Log;
    log(level: string, message?: string, infoObject?: object, meta?: object): void

}