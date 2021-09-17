import {Record} from "../Record";
import {recordSubmitUrl} from "../../api";

export class Level {

    record = {};

    constructor(record){
        this.record = record;
    }

    display(){
        this.record.reset();
        this.displayTiles();
        this.addTileEvents();
    }

    displayTiles(){
        // Extend method to call displayTile() for each level here;
    }

    displayTile(tileClass, icon, text, index, key, checked){
        const template = document.querySelector('#recordTileTemplate');
        const tile = template.content.cloneNode(true);
        const div = tile.querySelector("div");
        const label = tile.querySelector("label");
        const checkbox = tile.querySelector("input[type=checkbox]");
        label.innerHTML = `<i class="fa ${icon}"></i> ${text}`;
        label.dataset.index = index;
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
        document.querySelector('#backButton').addEventListener('click', this.handleBackButtonClick.bind(this));
        document.querySelector('#finishButton').addEventListener('click', this.handleFinishButtonClick.bind(this));
    }

    handleTileLabelClick(){
        // Extend method for the relevant callback at each level
    }

    async handleTileCheckboxClick(e){
        const checkbox = e.target;
        const id = e.target.dataset.key;
        const url = checkbox.checked ? this.getCompleteUrl(id) : this.getResetUrl(id);
        const {data} = await axios.post(url);
        this.record.load(data);
    }

    handleBackButtonClick(){
        // Extend method for the relevant callback at each level
    }

    async handleFinishButtonClick(){
        const modal = document.querySelector('.finishModal')
        modal.classList.remove('hide');
        modal.querySelector('.cancelBtn').addEventListener('click', () => modal.classList.add('hide'));
        modal.querySelector('.finishBtn').addEventListener('click', async () => {
            const url = recordSubmitUrl.replace('{record}', this.record.record.id);
            await axios.post(url)
            this.record.clear();
            modal.classList.add('hide');
            document.querySelector('#startButton').innerHTML('Start checks <i class="fa fa-arrow-right"></i><');
        });
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
