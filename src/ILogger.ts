import Log from "./ILog";
import Ack from "./Ack";


export default interface ILogger{

    message(message: string): Log;
    meta(meta: object): Log;
    object(object: object): Log;
    log(level: string, message?: string, infoObject?: object, meta?: object): Ack

}
