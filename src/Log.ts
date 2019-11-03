import ILog from "./ILog";
import ILogger from "./ILogger";


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

    public debug(): void {
        this.logger.log('debug', this.msg, this.infoObject, this.metaObject)
    }

    public error(): void {
        this.logger.log('error', this.msg, this.infoObject, this.metaObject)
    }

    public fatal(): void {
        this.logger.log('fatal', this.msg, this.infoObject, this.metaObject)
    }

    public info(): void {
        this.logger.log('info', this.msg, this.infoObject, this.metaObject)
    }

    public trace(): void {
        this.logger.log('trace', this.msg, this.infoObject, this.metaObject)
    }

    public warn(): void {
        this.logger.log('warn', this.msg, this.infoObject, this.metaObject)
    }

    public log(level: string) {
        this.logger.log(level, this.msg, this.infoObject, this.metaObject)
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