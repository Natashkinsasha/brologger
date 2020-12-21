


export default class Ack {

    constructor(private readonly promise: Promise<void>) {
    }

    public async get(){
        return this.promise;
    }

}
