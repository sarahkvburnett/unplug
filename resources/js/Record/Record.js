import {recordFindUrl} from "../api";
import {Floors} from "./Level/Floors";
import {Rooms} from "./Level/Rooms";
import {Checks} from "./Level/Checks";

export class Record {

    record = {};
    floors = [];

    currentLevel = '';
    currentFloor = {};
    currentRoom = {};

    constructor(data = null){
        if (data) this.load(data);
    }

    async find(){
        const {data} = await axios.post(recordFindUrl)
        this.load(data);
    }

    load(data){
        this.record = data;
        this.floors = data.checks.floors;
    }

    display(){
        this.displayFloors(this);
    }

    displayFloors(){
        this.currentLevel = 'floors';
        this.currentFloor = null;
        this.currentRoom = null;
        const floors = new Floors(this);
        floors.display();
    }

    displayRooms(key = null){
        if (key) this.currentFloor = this.record.checks.floors[key];
        this.currentLevel = 'rooms';
        this.currentRoom = null;
        const rooms = new Rooms(this);
        rooms.display();
    }

    displayChecks(key){
        this.currentRoom = this.currentFloor.rooms[key];
        this.currentLevel = 'checks';
        const checks = new Checks(this);
        checks.display();
    }

    clear(){
        const parent = document.querySelector('#recordTileWrapper');
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
    }

}
