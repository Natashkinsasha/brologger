import ITransport from './ITransport';
import ConsoleTransport from "./ConsoleTransport";
import {EventEmitter} from "events";


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
    transports: ReadonlyArray<ITransport>;
    level?: string;
    levels?: Levels;
}

export default class Logger extends EventEmitter{
    private readonly transports: ReadonlyArray<ITransport>;
    private readonly logLevelValue: number;
    private readonly levels: Levels;

    constructor(options?: LoggerOptions) {
        super();
        this.levels = options && options.levels || defaultLevels;
        const level = Logger.getLogLevel(this.levels, options && options.level);
        this.logLevelValue = Logger.getLevelValue(this.levels, level);
        this.transports = options && options.transports || [new ConsoleTransport()];
        this.transports.forEach((transport)=>{
            transport.setLogger(this);
        });
    }

    public getLevels(){
        return this.levels;
    }


    public trace(infoObject: object | string) {
        return this.loge('trace', infoObject);
    }

    public debug(infoObject: object | string) {
        return this.loge('debug', infoObject);
    }

    public info(infoObject: object | string) {
        return this.loge('info', infoObject);
    }

    public warn(infoObject: object | string) {
        return this.loge('warn', infoObject);
    }

    public error(infoObject: object | string) {
        return this.loge('error', infoObject);
    }

    public fatal(infoObject: object | string) {
        return this.loge('fatal', infoObject);
    }

    public log(level: string, infoObject: object | string) {
        return this.loge(level, infoObject);
    }


    private loge(level: string, infoObject: object | string) {
        return this.transports.forEach((transport) => {
            const transportLevel = transport.getLogLevel();
            const logLevelValue = transportLevel && Logger.getLevelValue(this.levels, transportLevel) || this.logLevelValue;
            const levelValue = Logger.getLevelValue(this.levels, level);
            if(logLevelValue >= levelValue){
                transport.log(level, infoObject)
                    .catch((err: Error)=>{
                        this.emit('error', err);
                    });
            }
        });
    }

    private static getLogLevel(levels: Levels, level?: string){
        if(level){
            return level;
        }
        const levelKeys = Object.keys(levels);
        if (levelKeys.length === 0) {
            throw new Error('Logger levels is empty.');
        }
        const logLevel =  levelKeys[0];
        if(!logLevel){
            throw new Error('Logger levels is empty.');
        }
        return logLevel;
    }

    private static getLevelValue(levels: Levels, level: string){
        const levelValue = levels[level];
        if(!Number.isInteger(levelValue)){
            throw new Error('Can not choose log level');
        }
        return levelValue;
    }
}
