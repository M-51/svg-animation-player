import constantsReplacer from './constants-replacer';
import fromToInterpreter from './from-to-interpreter';

function interpreter(list) {
    const interpretedList = [];
    list.forEach((item) => {
        // replace constants with functions
        constantsReplacer(item);
        fromToInterpreter(item);
        interpretedList.push(item);
    });
    return interpretedList;
}

export default interpreter;
