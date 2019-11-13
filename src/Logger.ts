import ITransport from './ITransport';
import ConsoleTransport from "./ConsoleTransport";
import {EventEmitter} from "events";
import ILogger from "./ILogger";
import ILog from "./ILog";
import Log from "./Log";


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
    transports?: ReadonlyArray<ITransport>;
    level?: string;
    levels?: Levels;
    meta?: object;
}

export default class Logger extends EventEmitter implements ILogger {

    private readonly transports: ReadonlyArray<ITransport>;
    private readonly logLevelValue: number;
    private readonly levels: Levels;
    private readonly metaObject?: object;

    constructor(options?: LoggerOptions) {
        super();
        this.levels = options && options.levels || defaultLevels;
        this.metaObject = options && options.meta;
        const level = Logger.getLogLevel(this.levels, options && options.level);
        this.logLevelValue = Logger.getLevelValue(this.levels, level);
        this.transports = options && options.transports || [new ConsoleTransport()];
        this.transports.forEach((transport) => {
            transport.setLogger(this);
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


    public log(level: string, message?: string, infoObject?: object, meta?: object) {
        Promise
            .all(
                this.transports.map((transport) => {
                    return Promise.resolve()
                        .then(async () => {
                            const transportLevel = transport.getLogLevel();
                            const logLevelValue = transportLevel && Logger.getLevelValue(this.levels, transportLevel) || this.logLevelValue;
                            const levelValue = Logger.getLevelValue(this.levels, level);
                            if (logLevelValue >= levelValue) {
                                await transport.log(level, message, infoObject, (meta || this.metaObject) && {...this.metaObject, ...meta})
                            }
                        })
                        .catch((err: Error) => {
                            this.emit('error', err);
                        });
                })
            );
    }

    private static getLogLevel(levels: Levels, level?: string) {
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

    private static getLevelValue(levels: Levels, level: string) {
        const levelValue = levels[level];
        if (!Number.isInteger(levelValue)) {
            throw new Error('Can not choose log level');
        }
        return levelValue;
    }
}
