import {Level} from "./Abstract";
import {floorCompleteUrl, floorResetUrl} from "../../api";

export class Floors extends Level {

    tileClass = 'tileFloor';

    displayTiles(){
        const text = ['Downstairs', 'Upstairs'];
        this.record.floors.forEach((floor, index) => this.displayTile(text[index], index, this.isFloorComplete(floor)));
    }

    displayTile(text, key, checked){
        super.displayTile(this.tileClass, text, key, checked);
    }

    handleTileLabelClick(e){
        this.record.displayRooms(e.target.dataset.key);
    }

    handleBackButtonClick() {
        super.record.clear();
    }

    addTileEvents() {
        super.addTileEvents(this.tileClass);
    }

    getCompleteUrl(id) {
        return super.getCompleteUrl(floorCompleteUrl, id);
    }

    getResetUrl(id) {
        return super.getResetUrl(floorResetUrl, id);
    }

    isFloorComplete(floor){
        let isComplete = true;
        floor.rooms.forEach(room => room.checks.forEach(check => {
            if (check.value == "0") isComplete = false;
        }));
        return isComplete;
    }

}
