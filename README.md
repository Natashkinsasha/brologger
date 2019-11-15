# brologer

A simple logging library

# Installation

Npm
```javascript
npm install brolloger
```

Yarn
```javascript
yarn add brolloger
```

# Support

This library is quite fresh, and maybe has bugs. Write me an **email** to *natashkinsash@gmail.com* and I will fix the bug in a few working days.

# Quick start

```javascript
    import Loger, {ConsoleTransport} from 'brolloger';

    const transport = new ConsoleTransport();
    const logger = new Loger({transports: [transport]});
    logger.message('trace').trace();
    logger.message('debug').object({}).debug();
    logger.message('info').meta({}).info();
    logger.message('warn').object({}).meta({}).warn();
    logger.object({}).meta({}).error();
    logger.meta({}).fatal();
    logger.object({}).log('error');
```

# TypesScript

This library have typing in module.