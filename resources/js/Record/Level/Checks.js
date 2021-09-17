import {Level} from "./Abstract";
import {checkCompleteUrl, checkResetUrl} from "../../api";

export class Checks extends Level {

    tileClass = 'tileCheck'

    displayTiles(){
        this.record.floors[this.record.currentFloor].rooms[this.record.currentRoom].checks.forEach((check, index) => this.displayTile(check.category.icon, check.label, index, check.id, check.value == "1"));
    }

    displayTile(icon, text, index, key, checked){
        super.displayTile(this.tileClass, icon, text, index, key, checked);
    }

    handleTileLabelClick(e){
        return false;
    }

    handleBackButtonClick(e){
        this.record.displayRooms();
    }

    addTileEvents() {
        super.addTileEvents(this.tileClass);
    }

    getCompleteUrl(id) {
        return super.getCompleteUrl(checkCompleteUrl, id);
    }

    getResetUrl(id) {
        return super.getResetUrl(checkResetUrl, id);
    }

}
