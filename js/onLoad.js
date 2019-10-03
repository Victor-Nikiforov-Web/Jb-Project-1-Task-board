function onLoad(){
    // delet if time passed
    beforeOnLoad();
    // -- read again if the number of notes change after validtion of time -- //
    get = localStorage.getItem("numberOfNotesJason");
    noteslength = JSON.parse(get);
    // -- if there is no notes clear the memory -- //
    if(noteslength === 0){
    localStorage.clear();}
    //-------------------------
    for(i = 1 ; i < noteslength + 1 ;i++){
        //print all the notes.
        text = localStorage.getItem(i);
        newObj = JSON.parse(text);
        createNote(newObj.task,newObj.date,newObj.time);
    }}
function beforeOnLoad(){
    text = localStorage.getItem("numberOfNotesJason");
    numberBeforeOnLoad = JSON.parse(text);
    //--- check if the date & time passed and delet --- //
    for (i = 1 ; i < numberBeforeOnLoad+1 ;i++){
        text = localStorage.getItem(i);
        newObj = JSON.parse(text);
        checkIfDateAndTimePass(newObj,i);
    }}
function checkIfDateAndTimePass(object,numberOfObject){
    // -- get number of notes -- // 
    getNotes = localStorage.getItem("numberOfNotesJason");
    notes = JSON.parse(getNotes);
    //-- time from now -- //
    var newDate = new Date();
    var dateByNow = {dayByNow : newDate.getDate() ,mouthByNow : newDate.getMonth(),yearByNow : newDate.getFullYear() , hourByNow : newDate.getHours() , minutesByNow : newDate.getMinutes() };
    dateByNow.mouthByNow += 1;
    // -- date from note -- //
    splitDate = object.date.split("/");
    day = parseInt(splitDate[0]);
    mouth = parseInt(splitDate[1]);
    year = parseInt(splitDate[2]);
    // -- time from note -- //
    splitTime = object.time.split(":");
    hour = parseInt(splitTime[0]);
    minutes = parseInt(splitTime[1]);
    //------ Check ------- //
    if( year <= dateByNow.yearByNow && mouth <= dateByNow.mouthByNow && day < dateByNow.dayByNow){
    while(numberOfObject < notes + 1){
        localStorage.setItem(numberOfObject, localStorage.getItem(numberOfObject + 1));
        numberOfObject += 1;
        }
        CreateBoxForDeletedNotes(object);
        oldNumberGet = localStorage.getItem("numberOfNotesJason");
        oldNumber = JSON.parse(oldNumberGet);
        oldNumber -= 1; 
        localStorage.setItem("numberOfNotesJason", oldNumber);
        numberBeforeOnLoad -= 1 ;
    } else if (year === dateByNow.yearByNow && mouth === dateByNow.mouthByNow && day === dateByNow.dayByNow && hour <= dateByNow.hourByNow && minutes <= dateByNow.minutesByNow){
    while(numberOfObject < notes + 1){
        localStorage.setItem(numberOfObject, localStorage.getItem(numberOfObject + 1));
        numberOfObject += 1;
    }
        oldNumberGet = localStorage.getItem("numberOfNotesJason");
        oldNumber = JSON.parse(oldNumberGet);
        oldNumber -= 1; 
        localStorage.setItem("numberOfNotesJason", oldNumber);
        numberBeforeOnLoad -= 1 ;
        CreateBoxForDeletedNotes(object);     } }
// -- create text with the deletd task name -- //
function CreateBoxForDeletedNotes(obj){
    var boxId = document.getElementById('alertDeletedNotes');
    boxId.style.display = "block";
    boxId.style.wordWrap = "break-word";
    var p = document.createElement("p");
    var pValue = document.createTextNode("Task -" + " " + obj.task + " " + "has ended.");
    p.appendChild(pValue);
    boxId.appendChild(p);
}