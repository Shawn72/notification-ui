'use-strict';
//Login Ajax
$(document).ready(function () {

    //Ajax Start- This is to show ajax loading

    $(document).ajaxStart(function () {
        $(".gifLoading").css("display", "block");
    });

    $(document).ajaxStop(function() {
        $(".gifLoading").css("display", "none");
    });

    $(document).ajaxComplete(function () {
        $(".gifLoading").css("display", "none");
    });

    $('.pass_show').append('<span class="ptxt">Show</span>');
    $(document).on('click', '.pass_show .ptxt', function () {

        $(this).text($(this).text() == "Show" ? "Hide" : "Show");

        $(this).prev().attr('type', function (index, attr) { return attr == 'password' ? 'text' : 'password'; });

    });

    $('#btnLogin').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#loginMsg").html("");
        //Set data to be sent
        var data = {
            "myUsername": $("#vendor_email").val().trim(),
            "myPassword": $("#vendor_password").val().trim()
        }
        
            
                    $.ajax({
                        url: "/Home/CheckLogin",
                        type: "POST",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json"
                    }).done(function (status) {
                        switch (status) {
                            case "wrongcredentials":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Invalid account details!",
                                type: "error"
                            }).then(() => {
                                document.getElementById("btnLogin").disabled = false;
                                //do smth here
                                setTimeout(function () {
                                    $("#loginMsg").css("display", "block");
                                    $("#loginMsg").css("color", "red");
                                    $('#loginMsg').attr('class', 'alert alert-danger');
                                    $("#loginMsg").html("Invalid account details!");
                                }, 5000);
                            });
                            break;

                        case "UsernameEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Username field is empty, fill it first!",
                                type: "error"
                            }).then(() => {
                                document.getElementById("btnLogin").disabled = false;
                                setTimeout(function () {
                                    $("#loginMsg").css("display", "block");
                                    $("#loginMsg").css("color", "red");
                                    $('#loginMsg').attr('class', 'alert alert-danger');
                                    $("#loginMsg").html("Username field is empty, fill it first!");
                                }, 5000);
                            });
                            break;
                        case "PasswordEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Password field is empty, fill it first!",
                                type: "error"
                            }).then(() => {
                                document.getElementById("btnLogin").disabled = false;
                                setTimeout(function () {
                                    $("#loginMsg").css("display", "block");
                                    $("#loginMsg").css("color", "red");
                                    $('#loginMsg').attr('class', 'alert alert-danger');
                                    $("#loginMsg").html("Password field is empty, fill it first!");
                                }, 5000);
                            });
                            break;

                        case "PasswordMismatched":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Wrong Password!",
                                type: "error"
                            }).then(() => {
                                document.getElementById("btnLogin").disabled = false;
                                setTimeout(function () {
                                    $("#loginMsg").css("display", "block");
                                    $("#loginMsg").css("color", "red");
                                    $('#loginMsg').attr('class', 'alert alert-danger');
                                    $("#loginMsg").html("Wrong Password!");
                                }, 5000);
                            });
                            break;

                            case "Loginambassador":
                            //now login admin
                            document.getElementById("btnLogin").disabled = true;
                            window.location.href = '/Home/Index';
                            break;

                            case "Loginsupporter":
                            //now login customer
                            document.getElementById("btnLogin").disabled = true;
                            window.location.href = '/Home/Index_supporter';
                            break;

                        default :
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Error Encountered!",
                                type: "error"
                            }).then(() => {
                                document.getElementById("btnLogin").disabled = false;
                                setTimeout(function () {
                                    $("#loginMsg").css("display", "block");
                                    $("#loginMsg").css("color", "red");
                                    $('#loginMsg').attr('class', 'alert alert-danger');
                                    $("#loginMsg").html(status);
                                }, 5000);
                            });
                            break;
                        }
                });
           
        });

    $('#btnRegister').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");

        var vendormodel = {};
        //Set data to be sent
        vendormodel.FName = $("#txtAmbfName").val();
        vendormodel.LName = $("#txtAmbLName").val();
        vendormodel.Phonenumber = $("#txtPhonenumberAmb").val();
        vendormodel.IdNumber = $("#txtIDNoinAmb").val();
        vendormodel.Email = $("#txtEmailAddAmb").val().trim();
        vendormodel.Password1 = $("#txtPass1Amb").val().trim();
        vendormodel.Password2 = $("#txtPass2Amb").val().trim();

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you'd like to proceed with account creation?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Create Account!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/RegisterAmbassador",
                    type: "POST",
                    data: '{vendormodel: ' + JSON.stringify(vendormodel) + '}',
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function(status) {
                    switch (status) {
                    case "success":
                        Swal.fire
                        ({
                            title: "Account Created!",
                            text: "Ambassador account created successfully!",
                            type: "success"
                        }).then(() => {
                            //do smth here
                            setTimeout(function() {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "green");
                                $('#feedbackMsg').addClass("alert alert-success");
                                $("#feedbackMsg").html("Ambassador account created successfully!");
                            }, 5000);
                        });
                        break;

                        case "exists":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "email taken!",
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("email already taken!");
                            }, 5000);
                        });
                        break;
                      case "fnameEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "first name cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("first name cannot be empty!");
                                }, 5000);
                            });
                            break;

                         case "lnameEmpty":
                                Swal.fire
                                ({
                                    title: "Error!!!",
                                    text: "last name cannot be empty!",
                                    type: "error"
                                }).then(() => {
                                    //do smth here
                                    setTimeout(function () {
                                        $("#feedbackMsg").css("display", "block");
                                        $("#feedbackMsg").css("color", "red");
                                        $('#feedbackMsg').attr('class', 'alert alert-danger');
                                        $("#feedbackMsg").html("last name cannot be empty!");
                                    }, 5000);
                                });
                                break;

                        case "phonenoEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "mobile number cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("mobile number cannot be empty!");
                                }, 5000);
                            });
                            break;


                        case "IDEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "ID number cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("ID number cannot be empty!");
                                }, 5000);
                            });
                            break;

                    case "EmailEmpty":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Email Address cannot be empty!",
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Email Address cannot be empty!");
                            }, 5000);
                        });
                        break;
                    case "PasswordEmpty":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Password field cannot empty!",
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Password field cannot empty!");
                            }, 5000);

                            $("#txtPass2").html('');
                            $("#txtPass1").html('');
                        });
                        break;
                    case "Password2Empty":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Password confirmation field cannot empty!",
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Password confirmation field cannot empty!");
                            }, 5000);

                            $("#txtPass2").html('');
                            $("#txtPass1").html('');
                        });
                        break;


                    case "PasswordMismatched":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Password mismatched, type again!",
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("display", "block");
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').attr('class', 'alert alert-danger');
                                $("#feedbackMsg").html("Password mismatched, type again!");
                            }, 5000);

                            $("#txtPass2").html('');
                            $("#txtPass1").html('');
                        });
                        break;
                    default:
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: status,
                            type: "error"
                        }).then(() => {
                            //do smth here
                            setTimeout(function () {
                                $("#feedbackMsg").css("color", "red");
                                $('#feedbackMsg').addClass('alert alert-danger');
                                $("#feedbackMsg").html(status);
                            }, 5000);
                            window.location.href = '/Home/Register_User';
                        });
                        break;
                       }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your account creation!',
                    'error'
                );
            }
        });
    });

    $('#btnRegisterSuppt').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");

        var vendormodel = {};
        //Set data to be sent
        vendormodel.FName = $("#txtSuppfName").val();
        vendormodel.LName = $("#txtSuppLName").val();
        vendormodel.Phonenumber = $("#txtPhonenumberSupp").val();
        vendormodel.IdNumber = $("#txtIDNoinSupp").val();
        vendormodel.Email = $("#txtEmailAddSupp").val().trim();
        vendormodel.Password1 = $("#txtPass1Supp").val().trim();
        vendormodel.Password2 = $("#txtPass2Supp").val().trim();

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you'd like to proceed with account creation?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Create Account!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/RegisterSupporter",
                    type: "POST",
                    data: '{vendormodel: ' + JSON.stringify(vendormodel) + '}',
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (status) {
                        switch (status) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Account Created!",
                                text: "Ambassador account created successfully!",
                                type: "success"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "green");
                                    $('#feedbackMsg').addClass("alert alert-success");
                                    $("#feedbackMsg").html("Ambassador account created successfully!");
                                }, 5000);
                            });
                            break;

                        case "exists":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "email taken!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("email already taken!");
                                }, 5000);
                            });
                            break;
                        case "fnameEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "first name cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("first name cannot be empty!");
                                }, 5000);
                            });
                            break;

                        case "lnameEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "last name cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("last name cannot be empty!");
                                }, 5000);
                            });
                            break;

                        case "phonenoEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "mobile number cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("mobile number cannot be empty!");
                                }, 5000);
                            });
                            break;


                        case "IDEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "ID number cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("ID number cannot be empty!");
                                }, 5000);
                            });
                            break;

                        case "EmailEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Email Address cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("Email Address cannot be empty!");
                                }, 5000);
                            });
                            break;
                        case "PasswordEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Password field cannot empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("Password field cannot empty!");
                                }, 5000);

                                $("#txtPass2").html('');
                                $("#txtPass1").html('');
                            });
                            break;
                        case "Password2Empty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Password confirmation field cannot empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("Password confirmation field cannot empty!");
                                }, 5000);

                                $("#txtPass2").html('');
                                $("#txtPass1").html('');
                            });
                            break;


                        case "PasswordMismatched":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "Password mismatched, type again!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("Password mismatched, type again!");
                                }, 5000);

                                $("#txtPass2").html('');
                                $("#txtPass1").html('');
                            });
                            break;
                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').addClass('alert alert-danger');
                                    $("#feedbackMsg").html(status);
                                }, 5000);
                                window.location.href = '/Home/Index_supporter';
                            });
                            break;
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your account creation!',
                    'error'
                );
            }
        });
    });

    $('#btnGetCommision').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");

        var commissionmodel = {};
        //Set data to be sent
        commissionmodel.ServiceTypeCommision = $('#servicetype').find(":selected").attr('value');
        commissionmodel.ServiceFee = $("#txtServiceFee").val();
       

        Swal.fire({
            title: "See Commission?",
            text: "Proceed Calculate Commission?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Calculate!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/CalculateCommision",
                    type: "POST",
                    data: '{commissionmodel: ' + JSON.stringify(commissionmodel) + '}',
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (status) {
                    var splitstat = status.split('*');

                    switch (splitstat[0]) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Commission Calculated!",
                                text: "Successfully Computed!",
                                type: "success"
                            }).then(() => {
                                //do smth here
                                $("#txtCommission").val(splitstat[1]);
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "green");
                                    $('#feedbackMsg').addClass("alert alert-success");
                                    $("#feedbackMsg").html("Computed successfully!");
                                }, 3000);
                            });
                            break;

                        case "lsvcFeeEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "service fee cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("service fee cannot be empty!");
                                }, 3000);
                            });
                            break;
                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').addClass('alert alert-danger');
                                    $("#feedbackMsg").html(status);
                                }, 5000);
                            });
                            break;
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your account creation!',
                    'error'
                );
            }
        });
    });

    $('#btnSaveCommission').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");

        var commissionmodel = {};
        //Set data to be sent
        commissionmodel.ServiceTypeCommision = $('#servicetype').find(":selected").attr('value');
        commissionmodel.ServiceFee = $("#txtServiceFee").val();


        Swal.fire({
            title: "Post Transaction",
            text: "Proceed to Post Transaction?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Post!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/PostTransaction",
                    type: "POST",
                    data: '{commissionmodel: ' + JSON.stringify(commissionmodel) + '}',
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (status) {
                        var splitstat = status.split('*');

                        switch (splitstat[0]) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Transaction Posted!",
                                text: "Successfully Posted!",
                                type: "success"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "green");
                                    $('#feedbackMsg').addClass("alert alert-success");
                                    $("#feedbackMsg").html("Posted successfully!");
                                }, 3000);
                                window.location.href = '/Home/Post_Transactions';
                            });
                            break;

                        case "lsvcFeeEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "service fee cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("service fee cannot be empty!");
                                }, 3000);
                            });
                            break;
                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').addClass('alert alert-danger');
                                    $("#feedbackMsg").html(status);
                                }, 5000);
                            });
                            break;
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your account creation!',
                    'error'
                );
            }
        });
    });

    $('#btnGetAmbassaderCommision').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#feedbackMsg").html("");
        Swal.fire({
            title: "Get Commission Balance?",
            text: "Proceed Get Commission balance?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Pull my Commision Balance!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/CalculateCommisionBalance",
                    type: "POST",
                    data: '',
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (status) {
                        var splitstat = status.split('*');

                        switch (splitstat[0]) {
                        case "success":
                            Swal.fire
                            ({
                                title: "Commission Balance Calculated!",
                                text: "Successfully Computed!",
                                type: "success"
                            }).then(() => {
                                //do smth here
                                $("#txtCommissionAmb").val(splitstat[1]);
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "green");
                                    $('#feedbackMsg').addClass("alert alert-success");
                                    $("#feedbackMsg").html("Computed successfully!");
                                }, 3000);
                            });
                            break;

                        case "lsvcFeeEmpty":
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: "service fee cannot be empty!",
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("display", "block");
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').attr('class', 'alert alert-danger');
                                    $("#feedbackMsg").html("service fee cannot be empty!");
                                }, 3000);
                            });
                            break;
                        default:
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: status,
                                type: "error"
                            }).then(() => {
                                //do smth here
                                setTimeout(function () {
                                    $("#feedbackMsg").css("color", "red");
                                    $('#feedbackMsg').addClass('alert alert-danger');
                                    $("#feedbackMsg").html(status);
                                }, 5000);
                            });
                            break;
                        }
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled your account creation!',
                    'error'
                );
            }
        });
    });
    
    $("#btnPullphoto").on("click", function (e) {
        e.preventDefault();
        $("#inputPhoto").trigger("click");
    });

    $('#inputPhoto').change(function () {
     
        $.ajax({
            url: "/Home/UploadPhoto",
            type: "POST",
            data: new FormData($('#img_form')[0]),
            contentType: false,
            cache: false,
            processData: false
        }).done(function(status) {
            switch (status) {
            case "changedsuccess":
                Swal.fire
                ({
                    title: "Photo Changed!",
                    text: "Your photo changed successfully!",
                    type: "success"
                }).then(() => {
                    window.location.href = "/Home/Index";
                    location.reload(true);
                    $("#profilefeedback").css("color", "green");
                    $('#profilefeedback').attr("class", "alert alert-success");
                    $("#profilefeedback").html("Your photo changed successfully!");
                });
                break;

                case "nullinputerror":
                   Swal.fire
                   ({
                       title: "Error!",
                       text: "You have to select file first!",
                       type: "error"
                   }).then(() => {
                       $("#profilefeedback").css("color", "red");
                       $('#profilefeedback').attr("class", "alert alert-danger");
                       $("#profilefeedback").html("You have to select file first!");
                   });
                   break;
                case "unacceptableextension":
                   Swal.fire
                   ({
                       title: "File Extension Error!",
                       text: "File extension not allowed, ONLY PNG or JPEG!",
                       type: "error"
                   }).then(() => {
                       $("#profilefeedback").css("color", "red");
                       $('#profilefeedback').attr("class", "alert alert-danger");
                       $("#profilefeedback").html("File extension not allowed, ONLY PNG or JPEG!");
                   });
                   break;
            default:
                Swal.fire
                ({
                    title: "Error!",
                    text: "Error Occured!",
                    type: "error"
                }).then(() => {
                    $("#profilefeedback").css("color", "red");
                    $('#profilefeedback').attr("class", "alert alert-danger");
                    $("#profilefeedback").html(status);
                });
                break;
            }
            });

    });

    $('#btnResetPass').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();
        //reset to empty
        $("#passMsg").html("");
        //Set data to be sent
        var data = {
            "myEmail": $("#txtemail").val()
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to change password?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, change it!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Home/ResetPassword",
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (status) {
                switch (status) {
                case "emailEmpty":
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Email field is empty, fill it first!",
                            type: "error"
                        }).then(() => {
                            $("#passMsg").css("display", "block");
                            $("#passMsg").css("color", "red");
                            $('#passMsg').attr('class', 'alert alert-danger');
                            $("#passMsg").html("Email field is empty, fill it first!");
                            $("#txtemail").css('border', 'solid 2px red');
                            $("#txtemail").focus();
                        });
                        break;

                 case "pChangesuccess":
                        Swal.fire
                        ({
                            title: "Password Changed!",
                            text: "Your password reset successfully!",
                            type: "success"
                        }).then(() => {
                            $("#passMsg").css("display", "block");
                            $("#passMsg").css("color", "green");
                            $('#passMsg').attr("class", "alert alert-success");
                            $("#passMsg").html("Your password reset successfully, check your email!");
                            document.getElementById("btnResetPass").disabled = true;
                        });
                     break;
                default:
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: "Error Encountered!",
                            type: "error"
                        }).then(() => {
                            $("#passMsg").css("display", "block");
                            $("#passMsg").css("color", "red");
                            $('#passMsg').attr('class', 'alert alert-danger');
                            $("#passMsg").html(status);
                        });
                    break;
                }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled login process!',
                    'error'
                );
            }
        });

    });

    $('.date').datepicker({
        format: "dd/mm/yy",
        maxViewMode: 3,
        todayBtn: true,
        clearBtn: true,
        autoclose: true,
        calendarWeeks: true,
        toggleActive: true
    });

    $("body").delegate("#openRfQs .btnDownloadRfq", "click", function (event) {

        event.preventDefault();
        //reset to empty
        $("#openRfqId").html("");
        $("#downloadfavicon").addClass("fa fa-spinner fa-spin");
        $("#downloadfavicon").removeClass("fas fa-cloud-download-alt");

        //Set data to be sent    
        var data = { "rfqnumber": $(this).attr("rfqNo") }
        $.ajax({
            url: "/Home/RfQDocument",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json"
        }).done(function (status) {
            var splitstatus = status.split("*");

            switch (splitstatus[0]) {
            case "filedownloadsuccess":
                $("#openRfqId").css("display", "block");
                $("#openRfqId").css("color", "green");
                $("#openRfqId").html("RFQ Generated successfully, Click Download RfQ button!");
                $('#openRfqId').attr('class', 'alert alert-success');

                $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                $(".btnGetrfq").css("display", "block");
                $(".btnDownloadRfq").css("display", "none");
                $(".btnGetrfq").attr("dwldfilepath", splitstatus[1]);
                break;
            case "downloaderror":
                Swal.fire
                ({
                    title: "RFQ Generation Error!",
                    text: "Error downloading the RfQ Document, contact the office!",
                    type: "error"
                }).then(() => {
                    $("#openRfqId").css("display", "block");
                    $("#openRfqId").css("color", "red");
                    $('#openRfqId').attr('class', 'alert alert-danger');
                    $("#openRfqId").html("Error downloading the RfQ Document, contact the office!");
                    $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                    $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                });
                break;
            default:
                Swal.fire
                ({
                    title: "RFQ Exception Error!",
                    text: "Exception Error thrown! contact the developer to handle this!",
                    type: "error"
                }).then(() => {
                    $("#openRfqId").css("display", "block");
                    $("#openRfqId").css("color", "red");
                    $('#openRfqId').attr('class', 'alert alert-danger');
                    $("#openRfqId").html(status);
                    $("#downloadfavicon").removeClass("fa fa-spinner fa-spin");
                    $("#downloadfavicon").addClass("fas fa-cloud-download-alt");
                });
                break;
            }
        });
    });


    $("body").on("click", "#btnSave", function () {
        //Loop through the Table rows and build a JSON array.
        var financials = new Array();
        $("#tblIncome TBODY TR").each(function () {
            var row = $(this);
            var finance = {};
            finance.source = row.find("TD input").eq(0).val();
            finance.expected = row.find("TD input").eq(1).val();
            finance.actual = row.find("TD input").eq(2).val();
            financials.push(finance);
        });

        $.ajax({
            type: "POST",
            url: "FinanceEntries.aspx/InsertIncome",
            // data: JSON.stringify(finance),
            data: '{finance: ' + JSON.stringify(financials) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (status) {
                switch (status.d) {
                case "success":
                    alert("inserted success!");
                    window.location.href = "FinanceEntries.aspx?step=2";
                    console.log(status.d);
                    break;
                default:
                    alert("error: " + status);
                    console.log(status.d);
                    break;
                }            
            
            }
        });
    });
    
});
