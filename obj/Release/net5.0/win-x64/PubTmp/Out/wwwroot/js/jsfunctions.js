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
        //  alert("yes, am fucked up!")
        var formData = $(".form_edit_claim_alert").serialize();
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
                    type: "PUT",
                    url: "/Home/UpdateClaimAlert",
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
                                        title: "Claim alert edited!",
                                        text: "Claim alert edited success!",
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
        var formData = $(".form_edit_cst_alert_setting").serialize();

        // required fields
        var polId = $("#txtPolId").val();
        var poolNumber = $("#poolNo").val();
        var inPatientAlt = $("#inPAlert").val();
        var cstmerCode = $("#cstCode").val();
        var ipAltEmail = $("#txtIpAlertEmail").val();
        var fullMbrAlt = $("#txtfullmbralert").val();
        var fMbrUtEml = $("#fullMbrUtilEml").val();
        var schXpAEmail = $("#schmXpAltEmail").val();        
        var cutOffAge = $("#ageCutoffAlt").val();
        var splitReport = $("#splitToMultiSs").val();
        var reportFreq = $("#rprtFreq").val();
        var inclCatdesrpt = $("#inclCatDescr").val();
        var incUtlSumm = $("#inclUtilSummry").val();
        
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
        if (!schXpAEmail) {
            alert("Scheme Expiry Alert Email is a required Field, Cannot be null!")
            $("#schmXpAltEmail").css("border", "1px solid red");
            $("#schmXpAltEmail").focus();
            return
        }
        if (!cutOffAge) {
            alert("Cut Off Age is a required Field, Cannot be null!")
            $("#ageCutoffAlt").css("border", "1px solid red");
            $("#ageCutoffAlt").focus();
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
                    data: formData,
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
                                        App.alert({
                                            container: "#feedbackMsg",
                                            place: "append",
                                            type: "success",
                                            message: "Alert Setting edited!",
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

    //next fnct...


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
                    // newarr[i].insert_date,
                    new Date(newarr[i].insert_date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    newarr[i].ben_shared,
                    newarr[i].memType,
                    newarr[i].data_source,
                    newarr[i].policy_id,
                    newarr[i].customer_id,
                    newarr[i].country_code,
                    '<a class="nav-link info text-dark edit_cs_alert" href="javascript:;"><i class="fa fa-pencil-square" aria-hidden="true"> Edit </i></a>'
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
        var alertid = i.cells[0].innerHTML;
        window.location.href = "/Home/EditCustomerAlert?alertId=" + alertid;
    })


}

//START: list books
//var ldb = function () {
//    b = function () {
//        var tl = $("#tbl_dashb_books"),
//            l = tl.dataTable({
//                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
//                pageLength: 5,
//                language: { lengthMenu: " _MENU_ records" },
//                columnDefs: [
//                    {
//                        orderable: !0,
//                        defaultContent: "-",
//                        targets: "_all"
//                    },
//                    {
//                        searchable: !0,
//                        targets: "_all"
//                    }
//                ],
//                order: [
//                    [0, "asc"]
//                ],
//                bDestroy: true,
//                info: false,
//                processing: true,
//                retrieve: true,
//                responsive: true,
//                responsive: {
//                    details: false
//                }
//            });

//        $.ajaxSetup({
//            global: false,
//            type: "POST",
//            url: "/Home/DashboardBooks",
//            beforeSend: function () {
//                $(".modalspinner").show();
//            },
//            complete: function () {
//                $(".modalspinner").hide();
//            }
//        });

//        $.ajax({          
//            async: true,
//        }).done(function (json) {
//            //parse string to JSON                
//            var newarr = JSON.parse(JSON.stringify(json));           
//            l.fnClearTable();
//            for (var i = 0; i < newarr.length; i++) {
//                l.fnAddData([                  
//                    newarr[i].AlertID,
//                    newarr[i].title,
//                    newarr[i].author,
//                    newarr[i].price,
//                    newarr[i].numberofCopies

//                ]);
//            }
//        });
//    };
//    return {
//        init: function () {
//            b();
//        }
//    }
//}();