import Transport from './Transport';
import ConsoleTransport from "./ConsoleTransport";
import {EventEmitter} from "events";
import ILogger from "./ILogger";
import ILog from "./ILog";
import Log from "./Log";
import Ack from "./Ack";
import Stack from "./Stack";


const defaultLevels = {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
};

export interface Levels {
    [key: string]: number;
}

export interface LoggerOptions {
    transports?: ReadonlyArray<Transport>;
    logLevel?: string;
    logLevels?: ReadonlyArray<string>;
    levels?: Levels;
    meta?: object;
    source?: boolean;
}

export default class Logger extends EventEmitter implements ILogger {

    private readonly transports: ReadonlyArray<Transport>;
    private readonly logLevelValue: number;
    private readonly logLevelsValues?: ReadonlyArray<number>;
    private readonly levels: Levels;
    private readonly metaObject?: object;
    private readonly source: boolean;
    private task: Promise<void> = Promise.resolve();

    constructor(options?: LoggerOptions) {
        super();
        this.levels = options?.levels || defaultLevels;
        this.metaObject = options?.meta;
        this.source = options?.source || false;
        if(options?.logLevel && options?.logLevels){
            throw new Error('Options logLevel and logLevels can not be configured in one time');
        }
        const level = Logger.getLogLevel(this.levels, options?.logLevel);
        this.logLevelValue = Logger.getLevelValue(this.levels, level);
        if(options?.logLevels){
            this.logLevelsValues = Logger.getLevelsValues(this.levels, options?.logLevels)
        }
        this.transports = options?.transports || [new ConsoleTransport()];
        this.transports.forEach((transport) => {
            transport.setLogger(this);
        });
        this.task = Promise.resolve()
            .then(async () => {
                await this.initialize()
            });
    }

    public message(message: string): ILog {
        return new Log(this, {message});
    }

    public meta(meta: object): ILog {
        return new Log(this, {meta});
    }

    public object(object: object): ILog {
        return new Log(this, {object});
    }

    public getLevels(){
        return this.levels;
    }


    private async initialize(): Promise<void> {
        await Promise
            .all(
                this.transports.map((transport) => {
                    return transport
                        .initialize()
                        .catch((err)=>{
                            if(transport.listeners('error').length){
                                transport.emit('error', err);
                            } else{
                                this.emit('error', err);
                            }
                        });
                })
            );

    }

    public log(level: string, message?: string, infoObject?: object, meta?: object): Ack {
        const newMeta = this.getMeta(meta);
        const tasks = this.transports.map((transport) => {
            return () => this.transportLog(transport, level, message, infoObject, newMeta);
        });
        return new Ack(this.execute(() => Promise.all(tasks.map((task)=>(task())))));
    }

    private getMeta(meta?: object){
        if(this.source){
            const items = Stack.get(this.log);
            const item = items[1];
            const source = item && item.toString();
            if(source){
                return {...meta, source};
            }
        }
        return meta;
    }

    private async transportLog(transport: Transport, level: string, message?: string, infoObject?: object, meta?: object): Promise<void>{
        return Promise.resolve()
            .then(()=>{
                const levelValue = Logger.getLevelValue(this.levels, level);
                const transportLogLevelsValues = transport.getLogLevelsValues();
                const transportMeta = transport.getMeta();
                const metaObject = (meta || this.metaObject || transportMeta) && {...this.metaObject, ...transportMeta, ...meta};
                if(transportLogLevelsValues){
                    if(transportLogLevelsValues.includes(levelValue)){
                        return transport.log(level, message, infoObject, metaObject);
                    }
                    return;
                }
                const transportLogLevelValue = transport.getLogLevelValue();
                if(transportLogLevelValue){
                    if (transportLogLevelValue >= levelValue) {
                        return transport.log(level, message, infoObject, metaObject)
                    }
                    return;
                }
                if(this.logLevelsValues){
                    if(this.logLevelsValues.includes(levelValue)){
                        return transport.log(level, message, infoObject, metaObject)
                    }
                    return;
                }
                if (this.logLevelValue >= levelValue) {
                    return transport.log(level, message, infoObject, metaObject)
                }
                return;
            })
            .catch((err)=>{
                if(transport.listeners('error').length){
                    transport.emit('error', err);
                } else{
                    this.emit('error', err);
                }
            });
    }

    private execute(task: () => Promise<any>): Promise<void> {
        this.task = this.task.then(() => task(), () => task());
        return this.task;
    }

    public static getLogLevel(levels: Levels, level?: string) {
        if (level) {
            return level;
        }
        const levelKeys = Object.keys(levels);
        if (levelKeys.length === 0) {
            throw new Error('Logger levels is empty.');
        }
        const logLevel = levelKeys[0];
        if (!logLevel) {
            throw new Error('Logger levels is empty.');
        }
        return logLevel;
    }

    public static getLevelValue(levels: Levels, level: string) {
        const levelValue = levels[level];
        if (!Number.isInteger(levelValue)) {
            throw new Error('Can not choose log level');
        }
        return levelValue;
    }

    public static getLevelsValues(levels: Levels, logLevels: ReadonlyArray<string>) {
        return logLevels.map((logLevel)=>{
            return Logger.getLevelValue(levels, logLevel);
        })
    }
}
