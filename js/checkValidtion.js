// -----------------check input description --------------------- .
function checkValidationDescription(){
//vars 
const value = document.forms.noteForm.taskDes.value ;
const input = document.forms.noteForm.taskDes ;
//check value if false show error msg .
    if(value.length > 0){
        checkValidDesc = true ;
        formInputs.task = value;
        input.setAttribute( 'style','background-color: aliceblue  !important');
    //check if child is appended.
    if(errorMsgOn === true){
        removeMsg();
        errorMsgOn= false;
    }
    } else {
        input.setAttribute( 'style','background-color: red !important');
        checkValidDesc = false ;
    if(errorMsgOn === false){
        errorMsg();
        errorMsgOn= true; 
    }}}
//-------- Check Date Valid ------------- //
    function checkDate(){
        //in case you change the date to another day it will fix the time limt
        checkTime();
        //vars.
        const value = document.forms.noteForm.dateInput.value;
        const input = document.forms.noteForm.dateInput ;
        //Fix the date ,example for how the date is display : "9/25/19" . 
        var pickedDate = new Date(value);
        var dateByUser = {dayPicked : pickedDate.getDate() ,monthPicked : pickedDate.getMonth(),yearPicked : pickedDate.getFullYear() };
        dateByUser.monthPicked += 1;
        document.forms.noteForm.dateInput.value = dateByUser.dayPicked + "/" + dateByUser.monthPicked + "/" + dateByUser.yearPicked;
        //save the date to object .
        formInputs.date = document.forms.noteForm.dateInput.value;
        //now date
        var newDate = new Date();
        var dateByNow = {dayPicked : newDate.getDate() ,monthPicked : newDate.getMonth(),yearPicked : newDate.getFullYear() };
        dateByNow.monthPicked += 1;
//------------------check the date ------------------------------------
    if(dateByUser.dayPicked < dateByNow.dayPicked || formInputs.date === "" || dateByUser.monthPicked < dateByNow.monthPicked){
        input.setAttribute( 'style','background-color: red !important');
        checkValidDate = false;
        alert('You can choose starting today and on');
        if(errorMsgOn === false){
            errorMsg();
            errorMsgOn= true;
        }
        } else{
        input.setAttribute( 'style','background-color: aliceblue  !important');
        checkValidDate = true;
        if(errorMsgOn === true){
            removeMsg();
            errorMsgOn= false;
        } } }
//------------- Get the Time --------------//
function checkTime(){
    //--- take the input time and split him to hours & minutes. --- //
    const value = document.forms.noteForm.timePicker.value;
    const timeInput = document.forms.noteForm.timePicker;
    var separateTime = value.split(":");
    var pickedHour = parseInt(separateTime[0]);
    var pickedminutes = parseInt(separateTime[1]);
    //push to object
    formInputs.time = value;
    //--- date vars ---//
    const getInputDate = document.forms.noteForm.dateInput.value;
    var splitDate = getInputDate.split("/");
    var inputDate = parseInt(splitDate[0]);
    //-- now time --//
    var d = new Date();
    var nowHour = d.getHours();
    var nowMinutes = d.getMinutes();
    //-- now date --//
    var newDate = new Date();
    var dateByNow = {dayPicked : newDate.getDate() ,monthPicked : newDate.getMonth(),yearPicked : newDate.getFullYear() };
    dateByNow.monthPicked += 1;
    //----- now check if time is valid ----//
    //--- if time is empty its okay becuse time is not required ---//
    if(document.forms.noteForm.timePicker.value === ""){
        errorMsgCheckIfOn(timeInput);
        checkValidTime = true;}
    //--- if the date you choes equal to today ---//
    if(inputDate === dateByNow.dayPicked){
    // -- if picked hour smaller then now hour show error msg --//
    if(pickedHour < nowHour){
        errorMsgCheckIfOff(timeInput);
        checkValidTime = false;
    //-- else if pick hour equal to now hour but the minutes are smaller show error msg -- //
    } else if (pickedHour === nowHour && pickedminutes < nowMinutes){
        errorMsgCheckIfOff(timeInput);
        checkValidTime = false;
    }else{
        errorMsgCheckIfOn(timeInput);
        checkValidTime = true;}
} else{
    errorMsgCheckIfOn(timeInput);
    checkValidTime = true;}
}
// ----- error msg ------------//
function errorMsg(){
    const formId = document.getElementById("noteForm");
    const para = document.createElement("H3");
    para.innerHTML = "Please fix the red input/s.";
    para.setAttribute( 'style','background-color: red');
    formId.appendChild(para);
}
function removeMsg(){
    const formId = document.getElementById("noteForm");
    formId.removeChild(formId.lastChild);
}
// -- check if error msg appear on the page -- //
function errorMsgCheckIfOff(inputId){
    if(errorMsgOn === false){
        errorMsg();
        errorMsgOn= true;
       }
    inputId.setAttribute( 'style','background-color: red  !important');   
    }
function errorMsgCheckIfOn(inputId){
    if(errorMsgOn === true){
        removeMsg();
        errorMsgOn= false;
        }
    inputId.setAttribute( 'style','background-color: aliceblue  !important');  
    }
//------------ Check the inputs when click send ------- ///
function checkInputsOnSend(){
    //-- You could take a date forward and take an hour less than the moment and then return it to today and it would send ,thats why i put check time again. --//
    checkTime();
    //vars 
    const dateInputValue = document.forms.noteForm.dateInput.value ;
    const dateInput = document.forms.noteForm.dateInput ;
    const taskInputValue = document.forms.noteForm.taskDes.value ;
    const taskInput = document.forms.noteForm.taskDes ;
    const timeInputValue = document.forms.noteForm.timePicker.value;
    const timeInput = document.forms.noteForm.timePicker;
    // ---- task check --- //
    if (checkValidDesc === false || taskInputValue === ""){
        taskInput.setAttribute( 'style','background-color: red !important');
    if(errorMsgOn === false){
            errorMsg();
            errorMsgOn= true;
    }}
    // --- date input check ---// 
    if (checkValidDate === false || dateInputValue === ""){
        dateInput.setAttribute( 'style','background-color: red !important');
    if(errorMsgOn === false){
            errorMsg();
            errorMsgOn= true;
    }}
    // --- time input check ---// 
    if (checkValidTime === false){
        timeInput.setAttribute( 'style','background-color: red !important');
    if(errorMsgOn === false){
            errorMsg();
            errorMsgOn= true;
    }}
}
