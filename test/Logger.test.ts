import * as chai from 'chai';
import Logger from '../src/index'


describe('#Logger', () => {

    const {expect} = chai;

    describe('#new Logger()', ()=>{
        describe('#new', () => {
            it('1', () => {
                const logger = new Logger();
                expect(logger).to.be.a('object');
            });
        });

        describe('#fatal', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.message('fatal').meta({NODE_ENV: 'test'}).fatal();
            });
        });

        describe('#error', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error();
            });
        });

        describe('#warn', () => {
            it('1', async () => {
                const logger = new Logger({meta: {NODE_ENV: 'localhost'}});
                await logger.message('warn').meta({NODE_ENV: 'localhost', file: 'test.ts'}).object({test: 'test'}).warn();
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
                await logger.message('debug').debug();
            });
        });

        describe('#trace', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.message('trace').trace();
            });
        });

        describe('#log', () => {
            it('1', async () => {
                const logger = new Logger();
                await logger.log('error');
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
                await logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error();
                await logger.message('info').meta({NODE_ENV: 'test'}).object({test: 'test'}).info();
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


});
