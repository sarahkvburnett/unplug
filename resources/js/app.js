import {Record} from "./Record/Record";

require('./bootstrap');

if (document.querySelector('#recordTileWrapper')){
    document.querySelector('#startButton').onclick = async function(){
        const record = new Record();
        await record.find();
        record.display();
    };
}
