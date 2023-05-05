import { LightningElement, api, track } from 'lwc';
import {exportObjectData} from 'c/utils';

export default class TableComp extends LightningElement {
    @api tabletitle;
    @api tableheadericon;
    @api compDataList;
    @api compHeaderList;
    @api isActionable;
    @api isSelectable;
    @api headerlist;
    @api sfdcObject;
    @api isPaginationEnabled;
    @api isMassActionEnabled;
    @api isSearchEnabled;
    @api isHeaderSelectionDisabled;

    @track allRecordsChecked;
    @track recordpagenum;
    @track recordcount;

    @track selectedrecords = [];
    @api searchObjectName;

    @track mouseStart = '';
    @track oldWidth = '';

    get searchobjectlabel(){
        return "Search " + this.searchObjectName;
    }

    handleactionrowedit(event){
        console.log(event.target.dataset.index);
        const actionroweditevent = new CustomEvent('actionroweditevent', {detail : event.target.dataset.index});
        this.dispatchEvent(actionroweditevent);
    }

    handleactionrowcancel(event){
        console.log(event.target.dataset.index);
        const actionrowcancelevent = new CustomEvent('actionrowcancelevent', {detail : event.target.dataset.index});
        this.dispatchEvent(actionrowcancelevent);
    }

    handlecellvaluechangeevent(event){
        console.log(event.detail);
        const actioncellupdatedevent = new CustomEvent('actioncellupdatedevent', {detail : event.detail});
        this.dispatchEvent(actioncellupdatedevent);
        console.log('Event from tabel');
    }

    handleactionrowsave(event){
        console.log(event.target.dataset.index);
        const actionrowsaveevent = new CustomEvent('actionrowsaveevent', {detail : event.target.dataset.index});
        this.dispatchEvent(actionrowsaveevent);
    }

    handleallrecordschecked(event){
        if(this.allRecordsChecked){
            this.allRecordsChecked = false;
        }else{
            this.allRecordsChecked = true;
        }
        console.log(event.target.checked);
        const allrecordscheckedevent = new CustomEvent('allrecordscheckedevent', {detail : this.allRecordsChecked});
        this.dispatchEvent(allrecordscheckedevent);
    }

    handlesinglerecordchecked(event){
        console.log(event.target.dataset.index);
        console.log(event.target.checked);
        var evtobj = {}
        evtobj.rownum = event.target.dataset.index;
        evtobj.isselected =  event.target.checked;
        
        const singlerecordscheckedevent = new CustomEvent('singlerecordscheckedevent', {detail : evtobj});
        this.dispatchEvent(singlerecordscheckedevent);
    }

    handledownload(){
        try{
            exportObjectData(this.headerlist, this.compDataList);
        }catch(err){
            console.log(err);
        }
    }

    handleallsave(){
        const allrecordsaveevent = new CustomEvent('allrecordsaveevent', {detail : 'allrecordsevent'});
        this.dispatchEvent(allrecordsaveevent);
    }

    handlerecordselectevent(event){
        console.log(event.detail);
        const searchedrecordselectedevent = new CustomEvent('searchedrecordselectedevent', {detail : event.detail});
        this.dispatchEvent(searchedrecordselectedevent);
        console.log('searchedrecordselectedevent');
    }

    calculateWidth(event){
        var childObj = event.target
        var parObj = childObj.parentNode;
        var count = 1;
        while(parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        console.log('final tag Name'+parObj.tagName);
        var mouseStart=event.clientX;
        this.mouseStart = mouseStart;
        this.oldWidth = parObj.offsetWidth;
        console.log('oldWidth' + this.oldWidth);
    }

    setNewWidth(event){
        var childObj = event.target
        var parObj = childObj.parentNode;
        console.log('parObj' + parObj);
        var count = 1;
        while(parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        var mouseStart = this.mouseStart;
        var oldWidth = this.oldWidth;
        var newWidth = event.clientX- parseFloat(mouseStart)+parseFloat(oldWidth);
        parObj.style.width = newWidth+'px';
    }

    changeDescOrder(event){
        console.log(event.target.id);
        const actioncolchangedescorderevent = new CustomEvent('actioncolchangedescorderevent', {detail : event.target.id});
        this.dispatchEvent(actioncolchangedescorderevent);
    }

    changeAscOrder(event){
        console.log(event.target.id);
        const actioncolchangeascorderevent = new CustomEvent('actioncolchangeascorderevent', {detail : event.target.id});
        this.dispatchEvent(actioncolchangeascorderevent);
    }
}