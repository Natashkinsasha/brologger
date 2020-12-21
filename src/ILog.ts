import Ack from "./Ack";


export default interface ILog{

    message(message: string): ILog;
    meta(meta: object): ILog;
    object(object: object): ILog;
    trace(): Ack;
    debug(): Ack;
    info(): Ack;
    warn(): Ack;
    error(): Ack;
    fatal(): Ack;
    log(level: string): Ack;
}
