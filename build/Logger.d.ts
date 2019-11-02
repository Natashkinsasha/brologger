/// <reference types="node" />
import ITransport from './ITransport';
import { EventEmitter } from "events";
export interface Levels {
    [key: string]: number;
}
export interface LoggerOptions {
    transports: ReadonlyArray<ITransport>;
    level?: string;
    levels?: Levels;
}
export default class Logger extends EventEmitter {
    private readonly transports;
    private readonly logLevelValue;
    private readonly levels;
    constructor(options?: LoggerOptions);
    getLevels(): Levels;
    trace(infoObject: object | string): void;
    debug(infoObject: object | string): void;
    info(infoObject: object | string): void;
    warn(infoObject: object | string): void;
    error(infoObject: object | string): void;
    fatal(infoObject: object | string): void;
    log(level: string, infoObject: object | string): void;
    private loge;
    private static getLogLevel;
    private static getLevelValue;
}
