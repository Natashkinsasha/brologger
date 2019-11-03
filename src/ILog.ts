

export default interface ILog{

    message(message: string): ILog;
    meta(meta: object): ILog;
    object(object: object): ILog;
    trace(): void;
    debug(): void;
    info(): void;
    warn(): void;
    error(): void;
    fatal(): void;
    log(level: string);
}