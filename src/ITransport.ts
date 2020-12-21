import Logger from "./Logger";


export default interface ITransport {

    getLogLevelValue(): number | undefined;

    getLogLevelsValues(): ReadonlyArray<number> | undefined;

    log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void>;

    setLogger(logger: Logger): void;

    getMeta(): object | undefined;

    initialize(): Promise<void>
}
