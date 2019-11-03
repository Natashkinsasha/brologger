import * as chai from 'chai';
import {Logger} from '../src/index'


describe('#Logger', () => {

    const {expect} = chai;

    describe('#new', () => {
        it('1', () => {
            const logger = new Logger();
            expect(logger).to.be.a('object');
        });
    });

    describe('#fatal', () => {
        it('1', () => {
            const logger = new Logger();
            logger.message('fatal').meta({NODE_ENV: 'test'}).fatal();
        });
    });

    describe('#error', () => {
        it('1', () => {
            const logger = new Logger();
            logger.message('error').meta({NODE_ENV: 'test'}).object({test: 'test'}).error();
        });
    });

    describe('#warn', () => {
        it('1', () => {
            const logger = new Logger({meta: {NODE_ENV: 'localhost'}});
            logger.message('warn').meta( {NODE_ENV: 'localhost', file: 'test.ts'}).object({test: 'test'}).warn();
        });
    });

    describe('#info', () => {
        it('1', () => {
            const logger = new Logger();
            logger.object({info: 'info'}).info();
        });
    });

    describe('#debug', () => {
        it('1', () => {
            const logger = new Logger();
            logger.message('debug').debug();
        });
    });

    describe('#trace', () => {
        it('1', () => {
            const logger = new Logger();
            logger.message('trace').trace();
        });
    });

    describe('#log', () => {
        it('1', () => {
            const logger = new Logger();
            logger.log('error');
        });
    });

});