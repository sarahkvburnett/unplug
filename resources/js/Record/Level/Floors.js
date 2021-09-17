import {Level} from "./Abstract";
import {floorCompleteUrl, floorResetUrl} from "../../api";

export class Floors extends Level {

    tileClass = 'tileFloor';

    displayTiles(){
        const icon = ['fa-sun', 'fa-moon'];
        const text = ['Downstairs', 'Upstairs'];
        this.record.floors.forEach((floor, index) => this.displayTile(icon[index], text[index], index, index, this.isFloorComplete(floor)));
    }

    displayTile(icon, text, index, key, checked){
        super.displayTile(this.tileClass, icon, text, index, key, checked);
    }

    handleTileLabelClick(e){
        console.log(e);
        this.record.displayRooms(e.target.dataset.index);
    }

    handleBackButtonClick() {
        this.record.clear();
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
