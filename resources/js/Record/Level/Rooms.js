import {Level} from "./Abstract";
import {roomCompleteUrl, roomResetUrl} from "../../api";

export class Rooms extends Level {

    tileClass = 'tileRoom'

    displayTiles(){
        this.record.currentFloor.rooms.forEach((room, index) => this.displayTile(room.details.name, index, this.isRoomComplete(room)));
    }

    displayTile(text, key, checked){
        super.displayTile(this.tileClass, text, key, checked);
    }

    handleTileLabelClick(e){
        this.record.displayChecks(e.target.dataset.key);
    }

    handleBackButtonClick(e){
        this.record.displayFloors();
    }

    addTileEvents() {
        super.addTileEvents(this.tileClass);
    }

    getCompleteUrl(id) {
        return super.getCompleteUrl(roomCompleteUrl, id);
    }

    getResetUrl(id) {
        return super.getResetUrl(roomResetUrl, id);
    }

    isRoomComplete(room){
        let isComplete = true;
        room.checks.forEach( check => {
            if (check.value == "0") isComplete = false;
        })
        return isComplete;
    }

}
