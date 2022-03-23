'use-strict';
$(document).ready(function () {

    //ldb.init();    
    
    $(".tbl_datatable").dataTable({
        responsive: true,
        lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
        pageLength: 5,
        language: { lengthMenu: " _MENU_ records" },
        columnDefs: [
            {
                orderable: !0,
                defaultContent: "-",
                targets: "_all"
            },
            {
                searchable: !0,
                targets: "_all"
            }
        ],
        order: [
            [0, "asc"]
        ],
        bDestroy: true,
        info: false,
        processing: true,
        retrieve: true,       
        responsive: {
            details: true
        }
    });

    $("#pageselector .pagerButton").click(function (e) {
        e.preventDefault()
        var pageNumber = parseInt( $("#pageNo").val() );
        var pageSize = 100;
        var totalPagesCount = parseInt( $("#txtTotalPgs").val() );

        // alert("pages: " + pageNumber)

        if (pageNumber < 1 || !pageNumber) {
            alert("Logical error, fill in page number first!")
            return
        }
        if (pageNumber > totalPagesCount) {
            alert("Logical error, pagenumber input out of bounds!, pageNumber should be <=" + totalPagesCount)
            return
        }
        // now you can continue, no return
        fetchAlertsData(pageNumber, pageSize);      
       
    })

    //edit util alert
    $('.form_edit_util_alert .btnEditutilalert').click(function (e) {
        //  alert("yes, am fucked up!")
        var formData = $(".form_edit_util_alert").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to edit?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/UpdateCstUtilAlert",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true,
                    success: function (data) {
                        switch (data) {
                            case "success":
                                Swal.fire
                                    ({
                                        title: "Alert edited!",
                                        text: "Util alert edited success!",
                                        type: "success"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "success",
                                            message: "Util alert edited!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "check"
                                        });
                                    });
                                break;
                            default:
                                Swal.fire
                                    ({
                                        title: "Alert NOT edited!",
                                        text: "Error while editing!",
                                        type: "warning"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "danger",
                                            message: "Error occured!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "error"
                                        });
                                    });
                                break;
                        }

                    
                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function () {
                    //$('#updatePanel').hide();
                    //$(".modalspinner").hide();
                });

            } //end if

        });
    });

    //edit claim alert
    $('.form_edit_claim_alert .btnEditclaimalert').click(function (e) { 
       // var formData = $(".form_edit_claim_alert").serialize();
        e.preventDefault()

        var Id = $("#id").val();
        var cstId = $("#customer_id").val();
        var alertMaxAmt = $("#alert_max_amount").val();
       // var alertEmailAddr = $("#emAddressAlt option:selected").val();
        var cntryCode = $("#country_code").val();
        var alertMaxClaimAmt = $("#alert_max_claim_amount").val();

        //select all the values in the listbox
        var listbox = document.getElementById("emAddressAlt");
        for (var count = 0; count < listbox.options.length; count++) {
            listbox.options[count].selected = true;
        }
        //split on comma and replace it with ";"
        var listemails = $("#emAddressAlt").val().toString();
        var joinedEmails = listemails.replace(/,/g, ';');

        //declare model to pass over to controller
        var claimlAlert = {}

        claimlAlert.id = Id;
        claimlAlert.customer_id = cstId;
        claimlAlert.alert_max_amount = alertMaxAmt;
        claimlAlert.email_address = joinedEmails;
        claimlAlert.country_code = cntryCode;
        claimlAlert.alert_max_claim_amount = alertMaxClaimAmt;

        //input validations
        if (!cstId) {
            alert("Customer Id is a required field, Cannot be null!")
            $("#customer_id").css("border", "1px solid red");
            $("#customer_id").focus();
            return
        }
        if (!alertMaxAmt) {
            alert("Alert Maximum Amount is a required field, Cannot be null!")
            $("#alert_max_amount").css("border", "1px solid red");
            $("#alert_max_amount").focus();
            return
        }
        if (!alertMaxClaimAmt) {
            alert("Alert Amximum Claim Amount is a required Field, Cannot be null!")
            $("#alert_max_claim_amount").css("border", "1px solid red");
            $("#alert_max_claim_amount").focus();
            return
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to edit?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "PUT",
                    url: "/Home/UpdateClaimAlert",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    // data: formData,
                    data: { "claimlAlert": claimlAlert },
                    async: true,
                    success: function (data) {
                       // alert(data)
                        switch (data) {
                            case "success":
                                Swal.fire
                                    ({
                                        title: "Claim alert edited!",
                                        text: "Claim alert edited success!",
                                        type: "success"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");                                       
                                    });
                                break;
                            default:
                                Swal.fire
                                    ({
                                        title: "Error Occured!",
                                        text: "Error Occured while editing!",
                                        type: "warning"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");                                       
                                    });

                                break;
                        }
                       
                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function () {
                    //$('#updatePanel').hide();
                    //$(".modalspinner").hide();
                });

            } //end if

        });
    });

    //edit full util alert
    $('.form_edit_util_set .btnEditUtilsetting').click(function (e) {
        //  alert("yes, am fucked up!")
        var formData = $(".form_edit_util_set").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to edit?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/UpdateFullShareSet",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true,
                    success: function (data) {
                        // alert(data)
                        switch (data) {
                            case "success":
                                Swal.fire
                                    ({
                                        title:"Util share edited!",
                                        text: "Util share edited success!",
                                        type: "success"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "success",
                                            message: "Util share edited!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "check"
                                        });
                                    });
                                break;
                            default:
                                Swal.fire
                                    ({
                                        title: "Error Occured!",
                                        text: "Error Occured while editing!",
                                        type: "warning"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "danger",
                                            message: "An error occured!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "error"
                                        });
                                    });

                                break;
                        }

                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function () {
                    //$('#updatePanel').hide();
                    //$(".modalspinner").hide();
                });

            } //end if

        });
    });

    //edit customer alert setting
    $('.form_edit_cst_alert_setting .btnEditAlertSetting').click(function (e) {

        e.preventDefault();       

        // required fields
        var Id = $("#id").val();
        var polId = $("#txtPolId").val();
        var poolNumber = $("#poolNo").val();
        var inPatientAlt = $("#inPAlert option:selected").val();
        var cstmerCode = $("#cstCode").val();
        var ipAltEmail = $("#txtIpAlertEmail").val();
        var fullMbrAlt = $("#full_member_util option:selected").val();
        var fMbrUtEml = $("#fullMbrUtilEml").val();
        var splitReport = $("#splitToMultiSs option:selected").val();
        var reportFreq = $("#rprtFreq").val();
        var inclCatdesrpt = $("#inclCatDescr option:selected").val();
        var incUtlSumm = $("#inclUtilSummry option:selected").val();
        var cstName = $("#customer_name").val();
        var perAlert = $("#percentage_alert").val();
        var cntryCode = $("#country_code").val();
        var inPWeeklyAlrt = $("#inpatient_weekly_alert option:selected").val();
        var mbrPercUtil = $("#member_perc_util option:selected").val();
        var schmUtilIndex = $("#scheme_util_index option:selected").val();
        var flMbrutilShared = $("#full_member_util_shared option:selected").val();

        //select all the values in the listbox
        var listbox = document.getElementById("emAddress");
        for (var count = 0; count < listbox.options.length; count++) {
            listbox.options[count].selected = true;
        }
        var listemails = $("#emAddress").val().toString();
        var joinedEmails = listemails.replace(/,/g, ';');

        var csalertSet = {}
        // var formData = $(".form_edit_cst_alert_setting").serialize();
        // alert("testing " + joined)

        csalertSet.id = Id;
        csalertSet.customer_name = cstName;
        csalertSet.percentage_alert = perAlert;
        csalertSet.email_address = joinedEmails;
        csalertSet.pol_id = polId;
        csalertSet.country_code = cntryCode;
        csalertSet.customer_code = cstmerCode;
        csalertSet.inpatient_alert = inPatientAlt;
        csalertSet.inpatient_weekly_alert = inPWeeklyAlrt;
        csalertSet.member_perc_util = mbrPercUtil;
        csalertSet.pool_number = poolNumber;
        csalertSet.scheme_util_index = schmUtilIndex;
        csalertSet.ip_alert_email = ipAltEmail;
        csalertSet.full_member_util = fullMbrAlt;
        csalertSet.full_member_util_shared = flMbrutilShared;
        csalertSet.full_member_util_email = fMbrUtEml;
        csalertSet.split_report_into_multiple_sheets = splitReport;
        csalertSet.perc_report_frequency = reportFreq;
        csalertSet.include_cat_desc = inclCatdesrpt;
        csalertSet.include_util_summary = incUtlSumm;

        if (!polId) {
            alert("Pol Id is a required field, Cannot be null!")
            $("#txtPolId").css("border", "1px solid red");
            $("#txtPolId").focus();
            return
        }
        if (!poolNumber) {
            alert("Pool Number is a required field, Cannot be null!")
            $("#poolNo").css("border", "1px solid red");
            $("#poolNo").focus();
            return
        }
        if (!inPatientAlt) {
            alert("Inpatient Alert is a required Field, Cannot be null!")
            $("#inPAlert").css("border", "1px solid red");
            $("#inPAlert").focus();
            return
        }
        if (!cstmerCode) {
            alert("Customer Code is a required Field, Cannot be null!")
            $("#cstCode").css("border", "1px solid red");
            $("#cstCode").focus();
            return
        }
        if (!ipAltEmail) {
            alert("IP Alert Email is a required Field, Cannot be null!")
            $("#txtIpAlertEmail").css("border", "1px solid red");
            $("#txtIpAlertEmail").focus();
            return
        }
        if (!fullMbrAlt) {
            alert("Full Member Alert is a required Field, Cannot be null!")
            $("#txtfullmbralert").css("border", "1px solid red");
            $("#txtfullmbralert").focus();
            return
        }
        if (!fMbrUtEml) {
            alert("Full Member Util Email is a required Field, Cannot be null!")
            $("#fullMbrUtilEml").css("border", "1px solid red");
            $("#fullMbrUtilEml").focus();
            return
        }
       
      
        if (!splitReport) {
            alert("Split Report In Multi Sheets is a required Field, Cannot be null!")
            $("#splitToMultiSs").css("border", "1px solid red");
            $("#splitToMultiSs").focus();
            return
        }
        if (!reportFreq) {
            alert("Report Frequency is a required Field, Cannot be null!")
            $("#splitToMultiSs").css("border", "1px solid red");
            $("#splitToMultiSs").focus();
            return
        }
        if (!inclCatdesrpt) {
            alert("Include Cat Description is a required Field, Cannot be null!")
            $("#inclCatDescr").css("border", "1px solid red");
            $("#inclCatDescr").focus();
            return
        }        
        if (!incUtlSumm) {
            alert("Include Util Summary is a required Field, Cannot be null!")
            $("#inclUtilSummry").css("border", "1px solid red");
            $("#inclUtilSummry").focus();
            return
        }
        
       
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to edit?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/UpdateCustomerAlertSettn",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                   // data: formData,
                    data: { "csalertSet": csalertSet },
                    async: true,
                    success: function (data) {
                        // alert(data)
                        switch (data) {
                            case "success":
                                Swal.fire
                                    ({
                                        title: "Customer Alert Setting edited!",
                                        text: "Alert Settings edited success!",
                                        type: "success"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");                                       
                                    });
                                break;
                            default:
                                Swal.fire
                                    ({
                                        title: "Error Occured!",
                                        text: "Error Occured while editing!",
                                        type: "warning"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");                                       
                                    });

                                break;
                        }

                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function () {
                    //$('#updatePanel').hide();
                    //$(".modalspinner").hide();
                });

            } //end if

        });
    });

    //edit individual statement config
    $('.form_edit_indvd_stat_config .btnEditIndStatConfig').click(function (e) {

        e.preventDefault();
        var formData = $(".form_edit_indvd_stat_config").serialize();

        // required fields
        var cstName = $("#txtCustName").val();
        var polId = $("#txtPolId").val();
        var mainBenefit = $("#txtMainbenefit").val();
        var famBenefit = $("#txtFambenefit").val();
        var sendFrquency = $("#txtSendFreq").val();
        var PasswordType = $("#txtPasswdtype").val();
        var splitPasswd = $("#txtSplitPasswd").val();
        var inclBanner = $("#txtInclbannerImg").val();
        var imageName = $("#txtImgname").val();
        var reportTempFile = $("#txtRpttempFile").val();
        var enableBlastEml = $("#txtEnablEmblast").val();
        var zeroAllocExc = $("#txtZeroallocExcempt").val();
        var emDomain = $("#txtMaildomain").val();

        if (!cstName) {
            alert("Customer Name is a required field, Cannot be null!")
            $("#txtCustName").css("border", "1px solid red");
            $("#txtCustName").focus();
            return
        }
        if (!polId) {
            alert("Pol Id is a required field, Cannot be null!")
            $("#txtPolId").css("border", "1px solid red");
            $("#txtPolId").focus();
            return
        }
        if (!mainBenefit) {
            alert("Main Benefit is a required Field, Cannot be null!")
            $("#txtMainbenefit").css("border", "1px solid red");
            $("#txtMainbenefit").focus();
            return
        }
        if (!famBenefit) {
            alert("Main Benefit is a required Field, Cannot be null!")
            $("#txtFambenefit").css("border", "1px solid red");
            $("#txtFambenefit").focus();
            return
        }
        if (!sendFrquency) {
            alert("Send Frequency is a required Field, Cannot be null!")
            $("#txtSendFreq").css("border", "1px solid red");
            $("#txtSendFreq").focus();
            return
        }
        if (!PasswordType) {
            alert("Full Member Alert is a required Field, Cannot be null!")
            $("#txtPasswdtype").css("border", "1px solid red");
            $("#txtPasswdtype").focus();
            return
        }
        if (!splitPasswd) {
            alert("Split Password is a required Field, Cannot be null!")
            $("#txtSplitPasswd").css("border", "1px solid red");
            $("#txtSplitPasswd").focus();
            return
        }
        if (!inclBanner) {
            alert("Include Banner Image is a required Field, Cannot be null!")
            $("#txtInclbannerImg").css("border", "1px solid red");
            $("#txtInclbannerImg").focus();
            return
        }
        if (!imageName) {
            alert("Image Name is a required Field, Cannot be null!")
            $("#txtImgname").css("border", "1px solid red");
            $("#txtImgname").focus();
            return
        }
        if (!reportTempFile) {
            alert("Report Template File is a required Field, Cannot be null!")
            $("#txtRpttempFile").css("border", "1px solid red");
            $("#txtRpttempFile").focus();
            return
        }
        if (!enableBlastEml) {
            alert("Enable Blast Email is a required Field, Cannot be null!")
            $("#txtEnablEmblast").css("border", "1px solid red");
            $("#txtEnablEmblast").focus();
            return
        }
        if (!zeroAllocExc) {
            alert("Zero Allocation Excempt is a required Field, Cannot be null!")
            $("#txtZeroallocExcempt").css("border", "1px solid red");
            $("#txtZeroallocExcempt").focus();
            return
        }
        if (!emDomain) {
            alert("Email Domain is a required Field, Cannot be null!")
            $("#txtMaildomain").css("border", "1px solid red");
            $("#txtMaildomain").focus();
            return
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to edit?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/UpdateStatementConfig",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true,
                    success: function (data) {
                        // alert(data)
                        switch (data) {
                            case "success":
                                Swal.fire
                                    ({
                                        title: "Statement Config edited!",
                                        text:  "Statement config edited success!",
                                        type:  "success"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "success",
                                            message: "Statement Config edited!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "check"
                                        });
                                    });
                                break;
                            default:
                                Swal.fire
                                    ({
                                        title: "Error Occured!",
                                        text: "Error Occured while editing!",
                                        type: "warning"
                                    }).then(() => {
                                        $("#feedbackMsg").css("display", "block");
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "danger",
                                            message: "An error occured!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "error"
                                        });
                                    });

                                break;
                        }

                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function () {
                    //$('#updatePanel').hide();
                    //$(".modalspinner").hide();
                });

            } //end if

        });
    });
      
    //edit alert setting table
    $("#tbl_cstalert_setting").dataTable({
        responsive: true,
        lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
        pageLength: 5,
        language: { lengthMenu: " _MENU_ records" },
        columnDefs: [
            {
                orderable: !0,
                defaultContent: "-",
                targets: "_all"
            },
            {
                searchable: !0,
                targets: "_all"
            },
            {
            "class": "text-wrap",
            targets:[ 4,12]
            }
        ],
        order: [
            [0, "asc"]
        ],
        bDestroy: true,
        info: false,
        processing: true,
        retrieve: true,
        responsive: {
            details: true
        }
    });

    //add email to the list    
    $('.form_edit_cst_alert_setting .btnAddEmailtoList').click(function (e) {
        e.preventDefault();
        var emToAdd = $("#add_email_list").val();
        var AddEmail = new Option(emToAdd, emToAdd);
        var listbox = document.getElementById("emAddress");
        listbox.options.add(AddEmail);
        alert("Email added to list!")
    })

    //selected listbox value to edit    
    $('.form_edit_cst_alert_setting .btnEditEmailLst').click(function (e) {
        e.preventDefault();
        var emToedit = $("#emAddress option:selected").val()
        if (!emToedit) {
            alert("select email to edit first!")
            return
        }
        var listbox = document.getElementById("emAddress");
        $("#editEmaildiv").css("display", "block")
        $("#edit_email_list").val(emToedit);
        listbox[listbox.selectedIndex].remove();
    })

    //add edited email back to list    
    $('.form_edit_cst_alert_setting .btnAddEditedEmailtoList').click(function (e) {
        e.preventDefault();
        var emToedit = $("#edit_email_list").val();
        if (!emToedit) {
            alert("edited email should not be null!")
            return
        }
        var AddEmail = new Option(emToedit, emToedit);
        var listbox = document.getElementById("emAddress");
        listbox.options.add(AddEmail);
        alert("Edited email added back to list!")
    })

    /////////////////////////
    //add email to the alert list    
    $('.form_edit_claim_alert .btnAddAlrtEmailtoList').click(function (e) {
        e.preventDefault();
        var emToAdd = $("#addAlrtEmailtoList").val();
        var AddEmail = new Option(emToAdd, emToAdd);
        var listbox = document.getElementById("emAddressAlt");
        listbox.options.add(AddEmail);
        alert("Email added to list!")
    })

    //select listbox value to edit    
    $('.form_edit_claim_alert .btnEditEmailAlrtLst').click(function (e) {
        e.preventDefault();
        var emToedit = $("#emAddressAlt option:selected").val()
        if (!emToedit) {
            alert("select email to edit first!")
            return
        }
        var listbox = document.getElementById("emAddressAlt");       
        $("#editAlrtEmailDiv").css("display", "block")
        $("#edit_alert_email_list").val(emToedit);
        listbox[listbox.selectedIndex].remove();
    })

    //add edited alert email back to list    
    $('.form_edit_claim_alert .btnAddEditedAlertEmailLst').click(function (e) {
        e.preventDefault();
        var emToedit = $("#edit_alert_email_list").val();
        if (!emToedit) {
            alert("edited email should not be null!")
            return
        }
        var AddEmail = new Option(emToedit, emToedit);
        var listbox = document.getElementById("emAddressAlt");
        listbox.options.add(AddEmail);
        alert("Edited email added back to list!")
    })

    // next fnct...

    /////////////////////////
    //add email to the util list    
    $('.form_edit_util_set .btnAddUtilEmailtoList').click(function (e) {
        e.preventDefault();
        var emToAdd = $("#addUtilEmailtoList").val();
        var AddEmail = new Option(emToAdd, emToAdd);
        var listbox = document.getElementById("emAddressUtil");
        listbox.options.add(AddEmail);
        alert("Email added to list!")
    })

    //select listbox value to edit    
    $('.form_edit_util_set .btnEditEmailUtilLst').click(function (e) {
        e.preventDefault();
        var emToeditU = $("#emAddressUtil option:selected").val()
        if (!emToeditU) {
            alert("select email to edit first!")
            return
        }
        var listbox = document.getElementById("emAddressUtil");
       // alert("selected index: "+listbox.selectedIndex)
        $("#editUtilEmailDiv").css("display", "block")
        $("#edit_util_email_list").val(emToeditU);
        listbox[listbox.selectedIndex].remove();
    })

    //add edited alert email back to list    
    $('.form_edit_util_set .btnAddEditedUtilEmailLst').click(function (e) {
        e.preventDefault();
        var emToedit = $("#edit_util_email_list").val();
        if (!emToedit) {
            alert("edited email should not be null!")
            return
        }
        var AddEmail = new Option(emToedit, emToedit);
        var listbox = document.getElementById("emAddressUtil");
        listbox.options.add(AddEmail);
        alert("Edited email added back to list!")
    })

    // next fnct...

});

//Fetch Huge Data
function fetchAlertsData(PageNumber, PageSize) {
    //Create loading panel
    var $loading = "<div class='loading'>Please wait...</div>";
    $('#updatePanel').prepend($loading);

    //create datatable here
    var tl = $("#tbl_customer_alerts_paged"),
        l = tl.dataTable({
            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
            pageLength: 5,
            language: { lengthMenu: " _MENU_ records" },
            columnDefs: [
                {
                    orderable: !0,
                    defaultContent: "-",
                    targets: "_all"

                },
                {
                    searchable: !0,
                    targets: "_all"
                }
            ],
            order: [
                [0, "asc"]
            ],
            bDestroy: true,
            info: false,
            processing: true,
            retrieve: true
        });

    $.ajaxSetup({
        global: false,
        type: "POST",
        url: "/Home/PagedCustomerAlerts",
        beforeSend: function () {
            $(".modalspinner").show();
        },
        complete: function () {
            $(".modalspinner").hide();
        }
    });

    $.ajax({
        data: { PageNumber: PageNumber, PageSize: PageSize },
        dataType: 'json',
        success: function (data) {
            var newarr = JSON.parse(JSON.stringify(data));

            // console.log(newarr)
            // alert(newarr)

            // table  body
            for (var i = 0; i < newarr.length; i++) {
                l.fnAddData([
                    newarr[i].alertID,
                    newarr[i].customer,
                    newarr[i].scheme,
                    newarr[i].memberName,
                    newarr[i].familyCode,
                    newarr[i].memberNumber,
                    newarr[i].benefit,
                    newarr[i].poolNr,
                    newarr[i].allocation,
                    newarr[i].expenditure,
                    newarr[i].balance,
                    newarr[i].percentageExpenditure,
                    newarr[i].percentageBalance,
                    new Date(newarr[i].insert_date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    newarr[i].benSharedString,
                    newarr[i].memType,
                    newarr[i].data_source,
                    newarr[i].policy_id,
                    newarr[i].customer_id,
                    newarr[i].country_code
                   
                ]);
            }
        },
        error: function () {
            alert('Network Error! Please try again!!');
        }
    }).done(function () {
        $('#updatePanel').hide();
        $(".modalspinner").hide();
    });

    tl.on("click", ".edit_cs_alert",
    function (tl) {
        tl.preventDefault();
        var i = $(this).parents("tr")[0];
        var alertid = i.cells[1].innerHTML;
        window.location.href = "/Home/EditCustomerAlert?alertId=" + alertid;
    })


}
