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
        document.querySelector('#welcome').classList.add('none');
        document.querySelector('#startButton').classList.add('hide');
        document.querySelector('#finishButton').classList.remove('hide');
        document.querySelector('#recordTileWrapper').classList.remove('none');
        document.querySelector('#title').innerText = 'My Checks';
        this.displayFloors(this);
    }

    displayFloors(){
        this.currentLevel = 'floors';
        this.currentFloor = null;
        this.currentRoom = null;
        const floors = new Floors(this);
        floors.display();
    }

    displayRooms(index = null){
        if (index) this.currentFloor = parseInt(index);
        this.currentLevel = 'rooms';
        this.currentRoom = null;
        const rooms = new Rooms(this);
        rooms.display();
    }

    displayChecks(index){
        this.currentRoom = parseInt(index);
        this.currentLevel = 'checks';
        const checks = new Checks(this);
        checks.display();
    }

    //Display new set of tiles
    reset(){
        //Empty tiles
        const parent = document.querySelector('#recordTileWrapper');
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
        //Reset back button
        document.querySelector('#backButtonWrapper').innerHTML = '<button id="backButton"><i class="fa fa-arrow-left"></i></button>';
    }

    //Remove record
    clear(){
        this.reset();
        document.querySelector('#startButton').classList.remove('hide');
        document.querySelector('#finishButton').classList.add('hide');
        document.querySelector('#backButtonWrapper').innerHTML = '';
        document.querySelector('#welcome').classList.remove('none');
        document.querySelector('#recordTileWrapper').classList.add('none');
        document.querySelector('#title').innerText = '';
    }

}
