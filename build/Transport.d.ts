/// <reference types="node" />
import ITransport from "./ITransport";
import { EventEmitter } from "events";
import Logger from "./Logger";
export interface TransportOptions {
    level?: string;
}
export default abstract class Transport extends EventEmitter implements ITransport {
    private readonly level?;
    private logger?;
    protected constructor(options?: TransportOptions);
    getLogLevel(): string | undefined;
    setLogger(logger: Logger): void;
    protected getLogger(): Logger | undefined;
    abstract log(level: string, infoObject: object | string): Promise<any>;
}
