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

    protected constructor(private readonly options?: TransportOptions) {
        super();
    }

    public getLogLevelValue(): number | undefined {
        return this.logLevelValue;
    }

    public getLogLevelsValues(): ReadonlyArray<number> | undefined {
        return this.logLevelsValues;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
        if(this.options?.logLevel){
            this.logLevelValue = Logger.getLevelValue(logger.getLevels(), this.options.logLevel)
        }
        if(this.options?.logLevels){
            this.logLevelsValues = Logger.getLevelsValues(logger.getLevels(), this.options.logLevels)
        }
    }

    protected getLogger() {
        return this.logger
    }

    public abstract log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void>;

    public async initialize(): Promise<void> {
        return;
    }

}
