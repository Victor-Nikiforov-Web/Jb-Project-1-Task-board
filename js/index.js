var checkValidDesc = false;
var checkValidDate = false;
var checkValidTime = false;
var errorMsgOn = false;
var noteIcon = false;
var noteIdNumber = 1;
var formInputs = {task : "",date : "" ,time : ""};
//----------------------------------------------------
function clickButton(){
    //--Check the inputs and mark at red invalid inputs --//
    checkInputsOnSend();
    // --- if all inputes are ok -- //
    if(checkValidDate === true && checkValidDesc === true && checkValidTime === true){
    //get the numbers of the notes.
        getMemoryFirstTime = localStorage.getItem("numberOfNotesJason");
        firstMemory = JSON.parse(getMemoryFirstTime);
    //if no notes so create objects in memory for the count.
    if(firstMemory === null ){
        number = JSON.stringify(0);
        localStorage.setItem("numberOfNotesJason", number);
    }
        //--------- create memory with the number ------- //
        // --- get number of notes and add him +1 for next note -- //
        getNumber = localStorage.getItem("numberOfNotesJason");
        theUpdatedNum = JSON.parse(getNumber);
        theUpdatedNum += 1 ;
        // -- add new note to memory and update numberOfnotes ---//
        myJSON = JSON.stringify(formInputs);
        localStorage.setItem(theUpdatedNum, myJSON);
        localStorage.setItem("numberOfNotesJason", theUpdatedNum);
        //-- create the note and clear the form -- //
        createNote(formInputs.task,document.forms.noteForm[1].value,formInputs.time);
        clearForm();
        // -- you can keep send forms becuse all check vars are true so i at least 1 false to stop it -- //
        checkValidDesc = false ;
        //----------Remove error msg becuse the form is ok . -----------//
    if(errorMsgOn === true){
        removeMsg();
        errorMsgOn= false;
    }
    } else {
    if(errorMsgOn === false){
        errorMsg();
        errorMsgOn= true;   }}}
//--------------------------            
function createNote(task,date,time){
    var noteDiv = document.getElementById('notes');
    //create the div .
    var div = document.createElement("div");
    div.setAttribute( 'class','col-xs-6 col-sm-6 col-md-4 col-lg-3 w3-animate-bottom note');
    div.setAttribute( 'id',noteIdNumber);
    div.setAttribute( 'onmouseover','createIcon(this)');
    div.setAttribute( 'onmouseleave','removeIcon(this)');
    noteDiv.appendChild(div);
    //create the Task description 
    var p = document.createElement("textarea");
    p.setAttribute( 'rows',"2");
    p.setAttribute( 'disabled',"");
    p.setAttribute( 'cols',"20");
    p.setAttribute( 'id','notetxt');
    var pValue = document.createTextNode(task);
    p.appendChild(pValue);
    div.appendChild(p);
    //---Date-- //
    var pDate = document.createElement("P");
    pDate.setAttribute( 'id','dateCss');
    var pValue = document.createTextNode(date);
    pDate.appendChild(pValue);
    div.appendChild(pDate);
    //---time-- //
    var pTime = document.createElement("P");
    pTime.setAttribute( 'id','timeCss');
    var pValue = document.createTextNode(time);
    pTime.appendChild(pValue);
    div.appendChild(pTime);
    //--------------
    noteIdNumber++;
}
// -- Function to clear form -- //
function clearForm(){
  document.forms.noteForm.dateInput.value = null ;
  document.forms.noteForm.taskDes.value = null ;
  document.forms.noteForm.timePicker.value = null ;
}
function deletNote(obj){
    //-- remove note from html -- //
    obj.remove();
    // -- get id num and make it from string to number -- //
    var objIndex = obj.getAttribute("id");
    var objIndexNum = parseInt(objIndex);
    var notesLength = document.getElementById('notes').children.length ;
    noteIcon = false ;
    //rearrange the notes in html -- //
    for(i = 0;i <notesLength;i++){
        var x = document.getElementById('notes').children[i];
        x.setAttribute( 'id',i+1); 
    }
    // -- rearrange the memory -- //
    while(objIndexNum < notesLength + 1){
        localStorage.setItem(objIndexNum, localStorage.getItem(objIndexNum + 1));
        objIndexNum += 1;
        }
        oldNumberGet = localStorage.getItem("numberOfNotesJason");
        oldNumber = JSON.parse(oldNumberGet);
        oldNumber -= 1; 
        localStorage.setItem("numberOfNotesJason", oldNumber);
}
function createIcon(obj) {
    if(noteIcon === false){
        var iconEl = document.createElement("span");
        iconEl.setAttribute( 'class','glyphicon glyphicon-remove xIcon');
        iconEl.setAttribute( 'aria-hidden','true');
        iconEl.setAttribute( 'id','spanIcon');
        iconEl.setAttribute( 'onclick','deletNote(this.parentNode);');
        obj.appendChild(iconEl);
        noteIcon = true ;
    } }
  function removeIcon(obj) {
    if(noteIcon === true){
        var item = document.getElementById("spanIcon");
        obj.removeChild(item);
        noteIcon = false ;
    }  }