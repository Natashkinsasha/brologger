"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const chalk_1 = require("chalk");
const Transport_1 = require("./Transport");
const colors = {
    fatal: "magenta",
    error: "red",
    warn: "yellow",
    info: "blue",
    debug: "gray",
};
class ConsoleTransport extends Transport_1.default {
    constructor(options) {
        super(options);
        this.colors = options && options.colors || colors;
    }
    async log(level, infoObject) {
        console.log(this.getColorMessageByLevel(`${new Date().toISOString()} - ${level}: ${util.inspect(infoObject)}`, level));
    }
    getColorMessageByLevel(message, level) {
        try {
            const color = this.colors[level];
            return chalk_1.default.keyword(color)(message);
        }
        catch (_a) {
            return message;
        }
    }
}
exports.default = ConsoleTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZVRyYW5zcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25zb2xlVHJhbnNwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUEwQjtBQUMxQiwyQ0FBd0Q7QUFFeEQsTUFBTSxNQUFNLEdBQUc7SUFDWCxLQUFLLEVBQUUsU0FBUztJQUNoQixLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBVUYsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVM7SUFJbkQsWUFBWSxPQUEwQztRQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsVUFBa0I7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBRVMsc0JBQXNCLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDM0QsSUFBSTtZQUNBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsT0FBTyxlQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsV0FBTTtZQUNKLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztDQUVKO0FBdEJELG1DQXNCQyJ9