import {Level} from "./Abstract";
import {checkCompleteUrl, checkResetUrl} from "../../api";

export class Checks extends Level {

    tileClass = 'tileCheck'

    displayTiles(){
        this.record.currentRoom.checks.forEach((check, index) => this.displayTile(check.label, index, check.value == "1"));
    }

    displayTile(text, key, checked){
        super.displayTile(this.tileClass, text, key, checked);
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
