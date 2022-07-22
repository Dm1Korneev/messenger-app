import debugConstructor from 'debug';

const log = debugConstructor('log');
const error = debugConstructor('error');
debugConstructor.enable('*');

export default { log, error };
