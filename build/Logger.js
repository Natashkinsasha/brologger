"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleTransport_1 = require("./ConsoleTransport");
const events_1 = require("events");
const defaultLevels = {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
};
class Logger extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.levels = options && options.levels || defaultLevels;
        const level = Logger.getLogLevel(this.levels, options && options.level);
        this.logLevelValue = Logger.getLevelValue(this.levels, level);
        this.transports = options && options.transports || [new ConsoleTransport_1.default()];
        this.transports.forEach((transport) => {
            transport.setLogger(this);
        });
    }
    getLevels() {
        return this.levels;
    }
    trace(infoObject) {
        return this.loge('trace', infoObject);
    }
    debug(infoObject) {
        return this.loge('debug', infoObject);
    }
    info(infoObject) {
        return this.loge('info', infoObject);
    }
    warn(infoObject) {
        return this.loge('warn', infoObject);
    }
    error(infoObject) {
        return this.loge('error', infoObject);
    }
    fatal(infoObject) {
        return this.loge('fatal', infoObject);
    }
    log(level, infoObject) {
        return this.loge(level, infoObject);
    }
    loge(level, infoObject) {
        return this.transports.forEach((transport) => {
            const transportLevel = transport.getLogLevel();
            const logLevelValue = transportLevel && Logger.getLevelValue(this.levels, transportLevel) || this.logLevelValue;
            const levelValue = Logger.getLevelValue(this.levels, level);
            if (logLevelValue >= levelValue) {
                transport.log(level, infoObject)
                    .catch((err) => {
                    this.emit('error', err);
                });
            }
        });
    }
    static getLogLevel(levels, level) {
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
    static getLevelValue(levels, level) {
        const levelValue = levels[level];
        if (!Number.isInteger(levelValue)) {
            throw new Error('Can not choose log level');
        }
        return levelValue;
    }
}
exports.default = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFrRDtBQUNsRCxtQ0FBb0M7QUFHcEMsTUFBTSxhQUFhLEdBQUc7SUFDbEIsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLEVBQUUsQ0FBQztJQUNSLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFDUCxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssRUFBRSxDQUFDO0NBQ1gsQ0FBQztBQVlGLE1BQXFCLE1BQU8sU0FBUSxxQkFBWTtJQUs1QyxZQUFZLE9BQXVCO1FBQy9CLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFDLEVBQUU7WUFDakMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSxLQUFLLENBQUMsVUFBMkI7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFB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