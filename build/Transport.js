"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Transport extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.level = options && options.level;
    }
    getLogLevel() {
        return this.level;
    }
    setLogger(logger) {
        this.logger = logger;
    }
    getLogger() {
        return this.logger;
    }
}
exports.default = Transport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQVFwQyxNQUE4QixTQUFVLFNBQVEscUJBQVk7SUFLeEQsWUFBc0IsT0FBMEI7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzFDLENBQUM7SUFFTSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBYztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRVMsU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0NBSUo7QUF4QkQsNEJBd0JDIn0=