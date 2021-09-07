import {Record} from "../Record";

export class Level {

    record = {};

    constructor(record){
        this.record = record;
    }

    display(){
        this.record.clear();
        this.displayTiles();
        this.addTileEvents();
    }

    displayTiles(){
        // Extend method to call displayTile() for each level here;
    }

    displayTile(tileClass, text, key, checked){
        console.log(checked);
        const template = document.querySelector('#recordTileTemplate');
        const tile = template.content.cloneNode(true);
        const div = tile.querySelector("div");
        const label = tile.querySelector("label");
        const checkbox = tile.querySelector("input[type=checkbox]");
        label.innerText = text;
        label.dataset.key = key;
        checkbox.dataset.key = key;
        checkbox.checked = checked;
        div.className = tileClass;
        document.querySelector('#recordTileWrapper').append(tile)
    }

    addTileEvents(tileClass){
        const tileLabelSelector = '.' + tileClass + ' label';
        const tileCheckboxSelector = '.' + tileClass + ' input[type="checkbox"]';
        document.querySelectorAll(tileLabelSelector).forEach(label => label.addEventListener('click', this.handleTileLabelClick.bind(this)));
        document.querySelectorAll(tileCheckboxSelector).forEach( checkbox => checkbox.addEventListener('change', this.handleTileCheckboxClick.bind(this)));
        document.querySelector('#backButton').removeEventListener('click', this.handleBackButtonClick.bind(this));
        document.querySelector('#backButton').addEventListener('click', this.handleBackButtonClick.bind(this));
    }

    handleTileLabelClick(){
        // Extend method for the relevant callback at each level
    }

    handleTileCheckboxClick(e){
        const checkbox = e.target;
        const id = e.target.dataset.key;
        const url = checkbox.checked ? this.getCompleteUrl(id) : this.getResetUrl(id);
        axios.post(url).then( data => this.record = new Record(data.data));
    }

    handleBackButtonClick(){
        // Extend method for the relevant callback at each level
    }

    getCompleteUrl(url, id){
        return url
            .replace('{record}', this.record.record.id)
            .replace('{id}', id)
            .replace('{check}', id);
    }

    getResetUrl(url, id){
        return url
            .replace('{record}', this.record.record.id)
            .replace('{id}', id);
    }

}
