

export default interface ILog{

    message(message: string): ILog;
    meta(meta: object): ILog;
    object(object: object): ILog;
    trace(): Promise<void>;
    debug(): Promise<void>;
    info(): Promise<void>;
    warn(): Promise<void>;
    error(): Promise<void>;
    fatal(): Promise<void>;
    log(level: string): Promise<void>;
}