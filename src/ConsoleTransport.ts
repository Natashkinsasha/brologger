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

export interface ConsoleTransportOptions extends TransportOptions{
    colors?: Colors;
}

export default class ConsoleTransport extends Transport {

    private readonly colors: Colors;

    constructor(options?: Partial<ConsoleTransportOptions>){
        super(options);
        this.colors = options && options.colors || colors;
    }

    public async log(level: string, ...infoObjects: Array<object | string>): Promise<any> {
        const message = infoObjects.reduce((message: string, infoObject: object | string, index)=>{
            return message.concat(" ").concat(util.inspect(infoObject));
        }, '');
        console.log(this.getColorMessageByLevel(`${new Date().toISOString()} - ${level}: ${message}`, level));
    }

    protected getColorMessageByLevel(message: string, level: string){
        try {
            const color = this.colors[level];
            return chalk.keyword(color)(message);
        } catch {
            return message;
        }
    }

}
