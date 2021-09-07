import {Record} from "./Record/Record";

require('./bootstrap');

console.log("v2");
if (document.querySelector('#recordTileWrapper')){
    (async function(){
        const record = new Record();
        console.log(record);
        await record.find();
        record.display();
    })();
}
