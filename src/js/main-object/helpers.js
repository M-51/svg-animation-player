import Create from './constructor';

function createMainObjectHelpers() {
    Create.prototype.deleteItemFromLoop = function deleteItemFromLoop(item) {
        console.log(item);
    };
}

export default createMainObjectHelpers;
