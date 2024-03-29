var validNotes = new Array () ;

function onLoad(){
    get = localStorage.getItem("numberOfNotesJason");
    noteslength = JSON.parse(get);
    //--- if number of notes = 0 clear memory //
    if(noteslength === 0){localStorage.clear();}
    // delet if time passed
    beforeOnLoad();
    //get all notes and Rearranges them by numbers;
    for(j = 1 ; j < noteslength +1 ;j++){
        text = localStorage.getItem(j);
        newObj = JSON.parse(text);
    if(newObj != null){
        validNotes.push(newObj);
    }}
    //--- now update them to memory --- //
    for(g = 0 ; g < validNotes.length ;g++){
    myJSON = JSON.stringify(validNotes[g]);
    localStorage.setItem(g+1, myJSON);
    }
    //write all the notes.
    for(i = 1 ; i < validNotes.length+1 ;i++){
    text = localStorage.getItem(i);
    newObj = JSON.parse(text);
    createNote(newObj.task,newObj.date,newObj.time);
    }
    //update number of notes to memory //
    localStorage.setItem("numberOfNotesJason", validNotes.length);
    //-- reset the array -- //
    validNotes = new Array ();
}
function beforeOnLoad(){
    text = localStorage.getItem("numberOfNotesJason");
    numberBeforeOnLoad = JSON.parse(text);
    //--- check if the date & time passed and delet --- //
    for (i = 1 ; i < numberBeforeOnLoad +1 ;i++){
    text = localStorage.getItem(i);
    newObj = JSON.parse(text);
    checkIfDateAndTimePass(newObj,i);}
    }
function checkIfDateAndTimePass(object,numberOfObject){
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
    //--- if day pass --- //
    if( year <= dateByNow.yearByNow && mouth <= dateByNow.mouthByNow && day < dateByNow.dayByNow){
        localStorage.removeItem(numberOfObject);
        CreateBoxForDeletedNotes(object);
    //--- if hours pass at same day ---- //
    } else if (year === dateByNow.yearByNow && mouth === dateByNow.mouthByNow && day === dateByNow.dayByNow && hour < dateByNow.hourByNow){
        localStorage.removeItem(numberOfObject);
        CreateBoxForDeletedNotes(object);     }
    //--- if the same hour and minutes pass -- //
    else if(year === dateByNow.yearByNow && mouth === dateByNow.mouthByNow && day === dateByNow.dayByNow && hour === dateByNow.hourByNow && minutes <= dateByNow.minutesByNow){
        localStorage.removeItem(numberOfObject);
        CreateBoxForDeletedNotes(object);   
    } }
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