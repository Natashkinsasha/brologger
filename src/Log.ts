import ILog from "./ILog";
import ILogger from "./ILogger";
import Ack from "./Ack";


export default class Log implements ILog {

    private readonly logger: ILogger;
    private msg?: string;
    private metaObject?: object;
    private infoObject?: object;

    constructor(logger: ILogger, {message, meta, object}: {message?: string, meta?: object, object?: object}) {
        this.logger = logger;
        this.msg = message;
        this.metaObject = meta;
        this.infoObject = object;
    }

    public debug(): Ack {
        return this.logger.log('debug', this.msg, this.infoObject, this.metaObject)
    }

    public error(): Ack {
        return this.logger.log('error', this.msg, this.infoObject, this.metaObject)
    }

    public fatal(): Ack {
        return this.logger.log('fatal', this.msg, this.infoObject, this.metaObject)
    }

    public info(): Ack {
        return this.logger.log('info', this.msg, this.infoObject, this.metaObject)
    }

    public trace(): Ack {
        return this.logger.log('trace', this.msg, this.infoObject, this.metaObject)
    }

    public warn(): Ack {
        return this.logger.log('warn', this.msg, this.infoObject, this.metaObject)
    }

    public log(level: string): Ack {
        return this.logger.log(level, this.msg, this.infoObject, this.metaObject)
    }


    public message(message: string): ILog {
        this.msg = message;
        return this;
    }

    public meta(meta: object): ILog {
        this.metaObject = meta;
        return this;
    }

    public object(object: object): ILog {
        this.infoObject = object;
        return this;
    }


}
