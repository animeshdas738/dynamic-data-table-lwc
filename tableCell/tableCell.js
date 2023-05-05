import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TableCell extends NavigationMixin(LightningElement)  {
    @api recordObj;
    @api recordLookupObj;
    @api recordLookupObjApiName;
    @api recordField;
    @api recordFieldType;
    @api recordFieldEditMode;
    @api recordFieldEditable;
    @api recordRowNum;

    @track recordValue;

    get recordLookupObjId(){
        let result  = '';
        if(this.recordFieldType === 'link'){
            if(this.recordObj[this.recordLookupObj]){
                result = this.recordObj[this.recordLookupObj]["Id"];
            }
        }
        return result;
    }
    get isLink(){
        return this.recordFieldType === 'link';
    }
    get isSelf(){
        return this.recordFieldType === 'self';
    }
    get isText(){
        return this.recordFieldType === 'text';
    }
    get isLongText(){
        return this.recordFieldType === 'longtext';
    }
    get isBoolean(){
        return this.recordFieldType === 'boolean';
    }
    get isDate(){
        return this.recordFieldType === 'date';
    }
    get isNumber(){
        return this.recordFieldType === 'number';
    }

    connectedCallback() {
        //console.log('connectedCallback');
        //console.log('recordObj>>>>' + JSON.stringify(this.recordObj));
        //console.log('recordLookupObj>>>>' + JSON.stringify(this.recordLookupObj));
        //this.recordValue = this.recordObj[this.recordField];
        if(this.recordFieldType === 'link'){
            if(this.recordObj[this.recordLookupObj]){
                this.recordValue = this.recordObj[this.recordLookupObj][this.recordField];
            }else{
                this.recordValue = '';
            }
            
        }else{
            this.recordValue = this.recordObj[this.recordField];
        }
    }

    handlecellchange(event){
        //console.log(event.target.value);
        const cellvaluechangeevent = new CustomEvent('cellvaluechangeevent', {detail : {"recordindex" : this.recordRowNum, "recordid" : this.recordObj.Id, "recordfield" : this.recordField, "fieldval" : event.target.value}});
        this.dispatchEvent(cellvaluechangeevent);
        //console.log('Event from Cell');
    }

    viewRecord(event){
        //console.log(this.recordLookupObjId);
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.recordLookupObjId,
                "objectApiName": this.recordLookupObjApiName,
                "actionName": "view"
            },
        }).then(url => {
            window.open(url, "_blank");
        });;
    }

    viewSelfRecord(event){
        //console.log(this.recordObj.Id);
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.recordObj.Id,
                "objectApiName": this.recordLookupObjApiName,
                "actionName": "view"
            },
        }).then(url => {
            window.open(url, "_blank");
        });;
    }
}