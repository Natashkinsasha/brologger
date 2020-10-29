import * as util from "util";
import chalk from 'chalk';
import Transport, {TransportOptions} from "./Transport";

const colors = {
    fatal: "magenta",
    error: "red",
    warn: "yellow",
    info: "blue",
    debug: "gray",
};

export interface Colors {
    [key: string]: string;
}

export interface ConsoleTransportOptions extends TransportOptions {
    colors?: Colors;
}

export default class ConsoleTransport extends Transport {

    private readonly colors: Colors;

    constructor(options?: Partial<ConsoleTransportOptions>) {
        super(options);
        this.colors = options && options.colors || colors;
    }


    protected getColorMessageByLevel(message: string, level: string) {
        try {
            const color = this.colors[level];
            return chalk.keyword(color)(message);
        } catch {
            return message;
        }
    }

    public async log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void> {
        let msg = '';
        if(meta){
            msg = msg.concat(`[${util.inspect(meta, {depth: null, breakLength: Infinity})}] `)
        }
        msg = msg.concat(`${new Date().toISOString()} - ${this.getColorMessageByLevel(level, level)}: `);
        if(message){
            msg = msg.concat(`${message} `)
        }
        if(message && infoObject){
            msg = msg.concat(`\n`)
        }
        if(infoObject){
            msg = msg.concat(`${util.inspect(infoObject, {depth: null, breakLength: Infinity, compact: false})}`)
        }
        console.log(msg);
    }


}
