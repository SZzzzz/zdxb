#!/usr/bin/env node
'use strict';

const argv = require('yargs')
    .usage('tm <template-type> <name> <target-path>')
    .example('tm component foo src/home')
    .argv;

const [template, name, target] = argv._;
const tm = require('../lib/index').default;
tm.createFrom(template, name, target);