import Create from './constructor';

function createMainObjectHelpers() {
    Create.prototype.deleteItemFromLoop = function deleteItemFromLoop(item) {
        this.loop.splice(this.loop.indexOf(item), 1);
        if (this.loop < 1) {
            this.end();
        }
    };
}

export default createMainObjectHelpers;
