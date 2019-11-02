import ITransport from "./ITransport";
import {EventEmitter} from "events";
import Logger from "./Logger";

export interface TransportOptions {
    level?: string;
}


export default abstract class Transport extends EventEmitter implements ITransport {

    private readonly level?: string;
    private logger?: Logger;

    protected constructor(options?: TransportOptions) {
        super();
        this.level = options && options.level;
    }

    public getLogLevel(): string | undefined {
        return this.level;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
    }

    protected getLogger() {
        return this.logger
    }

    public abstract log(level: string, infoObject: object | string): Promise<any>;

}