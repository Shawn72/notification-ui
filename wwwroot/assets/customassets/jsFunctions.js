'use-strict';
$(document).ajaxError(function (xhr, props) {
    if (props.status === 401) {
        window.location.href = '@Url.Action("Login","Home")';
    }
});
function getSelectedPosta() {
    var selectedVal = $('#ddlallpostacodes').find(":selected").attr('value');
    var selectedApplType = $('#ddlapplicantTypes').find(":selected").attr('value');
    var pp = document.getElementById('txtCity');
    $.ajax({
        type: "POST",
        url: "/Home/SelectedPosta",
        data: "postcode=" + selectedVal
    }).done(function (status) {
        if (status != "notfound") {
            pp.style = "background-color: #d7f4d7";
            pp.setAttribute('value', status);
            console.log('Selected City: ' + status);
        }
        else {
            $('#txtCity').val('');
            pp.style = "background-color: #f2bfb6";
            alert('Please Select valid Postal code!');
            $("#feedbackMsg").css("display", "block");
            $("#feedbackMsg").css("color", "red");
            $("#feedbackMsg").html("Please choose a valid post code!");
        }
        console.log(selectedApplType);

    });
}

function getSelectedPosta20() {
    var selectedVal = $('#ddlallpostacodes20').find(":selected").attr('value');
    var selectedApplType = $('#ddlapplicantTypes').find(":selected").attr('value');
    var ppInd = document.getElementById('txtCityInd');
    $.ajax({
        type: "POST",
        url: "/Home/SelectedPosta",
        data: "postcode=" + selectedVal
    }).done(function (status) {
        if (status != "notfound") {
            ppInd.style = "background-color: #d7f4d7";
            ppInd.setAttribute('value', status);
            console.log('Selected City: ' + status);
        }
        else {
            $('#txtCityInd').val('');
            ppInd.style = "background-color: #f2bfb6";
            alert('Please Select valid Postal code!');
            $("#feedbackMsg").css("display", "block");
            $("#feedbackMsg").css("color", "red");
            $("#feedbackMsg").html("Please choose a valid post code!");
        }
        console.log(status);
    });
}

function switchtheDiv() {
    var selectedVal = $('#ddlapplicantTypes').find(":selected").attr('value');
    switch(selectedVal) {
        case "1":
            $("#organizationView").css("display", "none");
            $("#individualView").css("display", "block");
            console.log(selectedVal);
            break;

        case "2":
            $("#organizationView").css("display", "block");
            $("#individualView").css("display", "none");
            console.log(selectedVal);
            break;
        default:
            Swal.fire
            ({
                title: "Wrong Choice",
                text: "You did not choose the account type!",
                type: "error"
            }).then(() => {
                $("#feedbackMsg").css("display", "block");
                $("#feedbackMsg").css("color", "red");
                $('#feedbackMsg').attr('class', 'alert alert-danger');
                $("#feedbackMsg").html("Kindly choose account type!");
            });
            console.log(selectedVal);
            break;
    }
}


function IsValidEmail(email) {
   var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ig;
     return expr.test(email);
};

const CheckTextArea=(textArea, maxLength) =>{
    document.getElementById("lblCharleftTextarea").innerHTML = maxLength - textArea.value.length + " characters left";
    if (textArea.value.length > maxLength) {
        document.getElementById("lblCharleftTextarea").style.color = "red";
        textArea.value = textArea.value.substr(0, maxLength);
        document.getElementById("lblCharleftTextarea").innerHTML = maxLength - textArea.value.length + " characters left";
    }
    else if (textArea.value.length < maxLength) {
        document.getElementById("lblCharleftTextarea").style.color = "Black";
    }
    else {
        document.getElementById("lblCharleftTextarea").style.color = "red";
    }
}
const validateEmail = (() => {
    var myemadd = $("#txtEmailAdd").val();
    var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/ig;
    if (reg.test(myemadd)) {
        $("#loginMsg").css("display", "block");
        $("#loginMsg").css("color", "green");
        $('#loginMsg').attr("class", "alert alert-success");
        $("#loginMsg").html("Email acceptable!");
        return 0;
    }
    else {
        Swal.fire
        ({
            title: "Email Validation Error!",
            text: "Only Business Email Address is allowed!",
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Provide a nice email!",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#ec6c62",
            position: "center"
        }).then(() => {
            $("#loginMsg").css("display", "block");
            $("#loginMsg").css("color", "red");
            $('#loginMsg').attr("class", "alert alert-danger");
            $("#loginMsg").html("Only Business Email Address is allowed!");
        });
        return false;
    }
});
const IsNumericQuantity = ((e) => {
var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
        document.getElementById("quantityerror").style.display = "inline";
        e.preventDefault();
    } else {
        document.getElementById("quantityerror").style.display = "none";
    }
});
const IsNumericAmount = ((e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
        document.getElementById("amounterror").style.display = "inline";
        e.preventDefault();
    } else {
        document.getElementById("amounterror").style.display = "none";
    }
});
const inputLimit = ((element, maxLegth) => {
    if (element.value.length > maxLegth) {
        element.value = element.value.substr(0, maxLegth);
    }
});

function getPullfileChooser() {
    var selectedVal = $('#doctoupload').find(":selected").attr('value');
    $("#pullupafilechooser").css("display", "block");
    switch (selectedVal) {
    case "noChoice":
        Swal.fire
        ({
            title: "Wrong Choice",
            text: "Kindly select kind of Doc to upload!",
            type: "error"
        }).then(() => {
            $("#uploadfeedbackMsg").css("display", "block");
            $("#uploadfeedbackMsg").css("color", "red");
            $('#uploadfeedbackMsg').attr('class', 'alert alert-danger');
            $("#uploadfeedbackMsg").html("Kindly select kind of Doc to upload!");
            $("#pullupafilechooser").css("display", "none");
        });
        break;
    default:
        $("#uploadfeedbackMsg").css("display", "none");
        $("#pullupafilechooser").css("display", "block");
        $("#selectedKindafile").html(selectedVal);
        break;
    }
}

//session end 
var sessionTimeoutWarning = '@Session.Timeout' - 1;
var sTimeout = parseInt(sessionTimeoutWarning) * 60 * 1000;
setTimeout('SessionEnd()', sTimeout);

function SessionEnd() {
    window.location.hostname = "";
    /* $(window.Location).attr("href", "@Url.Content("~/Login/index/")"); */
    window.location = "/Login/index/";
}