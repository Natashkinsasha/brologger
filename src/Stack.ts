

export default class Stack {
    public static get = (belowFn?: Function) => {
        var oldLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = Infinity;

        var dummyObject: any = {};

        var v8Handler = Error.prepareStackTrace;
        Error.prepareStackTrace = function(dummyObject, v8StackTrace) {
            return v8StackTrace;
        };
        Error.captureStackTrace(dummyObject, belowFn || exports.get);

        var v8StackTrace = dummyObject.stack;
        Error.prepareStackTrace = v8Handler;
        Error.stackTraceLimit = oldLimit;

        return v8StackTrace;
    }

}


