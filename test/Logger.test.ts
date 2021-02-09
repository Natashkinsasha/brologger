import * as chai from 'chai';
import Logger, {ConsoleTransport, Transport} from '../src/index'


describe('#Logger', () => {

    const {expect} = chai;

    describe('#new Logger()', ()=>{
        describe('#new', () => {
            it('1', () => {
                const logger = new Logger({source: true});
                expect(logger).to.be.a('object');
            });
        });

        describe('#fatal', () => {
            it('1', async () => {
                const logger = new Logger({source: true});
                await logger.message('fatal').meta({NODE_ENV: 'test'}).fatal().get();
            });
        });

        describe('#error', () => {
            it('1', async () => {
                const logger = new Logger({source: true});
                await logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error().get();
            });
        });

        describe('#warn', () => {
            it('1', async () => {
                const logger = new Logger({meta: {NODE_ENV: 'localhost'}, source: true});
                await logger.message('warn').meta({NODE_ENV: 'localhost', file: 'test.ts'}).object({test: 'test'}).warn().get();
            });
        });

        describe('#info', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.object({info: {info: {info: {info: "info"}}}, info2: {info: {info: {info: {info: "info"}}}}}).info();
            });
        });

        describe('#debug', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.message('debug').debug().get();
            });
        });

        describe('#trace', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.message('trace').trace().get();
            });
        });

        describe('#log', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.log('error').get();
            });
        });
    });

    describe('#new Logger({logLevel: \'error\'})', ()=>{
        describe('#new', () => {
            it('1', () => {
                const logger = new Logger({logLevel: 'error'});
                expect(logger).to.be.a('object');
            });
        });

        describe('#error', () => {
            it('1', async () => {
                const logger = new Logger({logLevel: 'error'});
                await logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error().get();
                await logger.message('info').meta({NODE_ENV: 'test'}).object({test: 'test'}).info().get();
            });
        });

        describe('#meta', () => {
            it('1', async () => {
                const logger = new Logger({logLevel: 'error',
                    meta: {loggerMeta: 'loggerMeta'}, transports: [new ConsoleTransport({meta: {transportMeta: 'transportMeta'}})]});
                await logger.message('error').meta({messageMeta: 'messageMeta'}).object({test: 'test'}).error().get();
            });
        });


    });

    describe('#new Logger({logLevels: [\'info\', \'error\']})', ()=>{
        describe('#new', () => {
            it('1', () => {
                const logger = new Logger({logLevels: ['info', 'error']});
                expect(logger).to.be.a('object');
            });
        });

        describe('#error', () => {
            it('1', async () => {
                const logger = new Logger({logLevels: ['info']});
                await logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error();
                await logger.message('info').meta({NODE_ENV: 'test'}).object({test: 'test'}).info();
            });
        });
    });

    describe('#Transport', ()=>{
        describe('#log', () => {
            it('1', (done) => {
                const logger = new Logger({transports: [new class extends Transport {
                        log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void> {
                            throw new Error('test')
                        }
                    }]});
                logger.on('error', ()=>{
                    done();
                });
                logger.message('').info()
            });

            it('2', (done) => {
                const transport = new class extends Transport {
                    log(level: string, message?: string, infoObject?: object, meta?: object): Promise<void> {
                        throw new Error('test')
                    }
                }
                const logger = new Logger({transports: [transport]});
                transport.on('error', ()=>{
                    done();
                });
                logger.message('').info()
            });
        });

        describe('#log', () => {
            it('1', (done) => {
                const logger = new Logger({transports: [new class extends ConsoleTransport {
                        async initialize(){
                            throw new Error();
                        }
                    }]});
                logger.on('error', ()=>{
                    done();
                });
            });

            it('2', (done) => {
                const transport = new class extends ConsoleTransport {
                    async initialize(){
                        throw new Error();
                    }
                }
                const logger = new Logger({transports: [transport]});
                transport.on('error', ()=>{
                    done();
                });
            });
        });

    });


});
