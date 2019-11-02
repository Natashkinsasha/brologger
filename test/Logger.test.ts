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
            logger.fatal('fatal');
        });
    });

    describe('#error', () => {
        it('1', () => {
            const logger = new Logger();
            logger.error('error');
        });
    });

    describe('#warn', () => {
        it('1', () => {
            const logger = new Logger();
            logger.warn('warn');
        });
    });

    describe('#info', () => {
        it('1', () => {
            const logger = new Logger();
            logger.info('info');
        });
    });

    describe('#debug', () => {
        it('1', () => {
            const logger = new Logger();
            logger.debug('debug');
        });
    });

    describe('#trace', () => {
        it('1', () => {
            const logger = new Logger();
            logger.trace('trace');
        });
    });

    describe('#log', () => {
        it('1', () => {
            const logger = new Logger();
            logger.log('error', 'log');
        });
    });

});