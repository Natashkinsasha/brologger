import ITransport from "./ITransport";
import {EventEmitter} from "events";
import Logger from "./Logger";

export interface TransportOptions {
    logLevel?: string;
    logLevels?: ReadonlyArray<string>;
    meta?: object;
}


export default abstract class Transport extends EventEmitter implements ITransport {

    private logLevelValue?: number;
    private logLevelsValues?: ReadonlyArray<number>;
    private logger?: Logger;
    private opt?: TransportOptions

    constructor(options?: TransportOptions) {
        super();
        this.opt = options;
    }

    public getMeta() {
        return this.opt?.meta;
    }

    public getLogLevelValue(): number | undefined {
        return this.logLevelValue;
    }

    public getLogLevelsValues(): ReadonlyArray<number> | undefined {
        return this.logLevelsValues;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
        if(this.opt?.logLevel){
            this.logLevelValue = Logger.getLevelValue(logger.getLevels(), this.opt.logLevel)
        }
        if(this.opt?.logLevels){
            this.logLevelsValues = Logger.getLevelsValues(logger.getLevels(), this.opt.logLevels)
        }
    }

    protected getLogger() {
        if(!this.logger){
            throw new Error('Error: there is no logger in the transport')
        }
        return this.logger
    }

    public abstract log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void>;

    public async initialize(): Promise<void> {
        return;
    }

}
