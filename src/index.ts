import Logger, { Levels } from "./Logger";
import ConsoleTransport, { Colors, ConsoleTransportOptions } from "./ConsoleTransport";
import Transport, { TransportOptions } from "./Transport";
import ITransport from "./ITransport";
import Log from "./Log";
import ILogger from "./ILogger";
import TransportError from "./TransportError";

export {ConsoleTransport, Transport, Log, ITransport, TransportOptions, ConsoleTransportOptions, Colors, Levels, ILogger, TransportError}

export default Logger;
