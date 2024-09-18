$(document).ready(function () {
    getall();
    function getall() { 
    $.ajax({
        url: '/Device/GetAllProducts',
        type: 'GET',
        dataType: 'JSON', // Correct dataType
        success: function (response) {
            var row = '';
            var tableBody = $("#expbody tbody");

            tableBody.empty(); // Clear the table body first

            if (response && response.length > 0) {
                console.log(response);  

                for (var i = 0; i < response.length; i++) {

                    row += '<tr>';
                    row += '<td>' + response[i].id + '</td>';
                    row += '<td>' + response[i].product + '</td>';
                    row += '<td>' + response[i].price + '</td>';
                    row += '<td>' + response[i].description + '</td>';
                    row += '<td>' + response[i].created + '</td>';
                    //row += '<td>' + response[i].amount + '</td>';
                    row += '<td class="action-icons">';

                    row += '<span><a  onclick="editRecord(' + response[i].id + ')"><i class="fas fa-edit"></i></a></span> ';

                    row += '<span><a href="#" onclick="deleteRecord(' + response[i].id + ')"><i class="fas fa-trash"></i></a></span>';

                    row += '<span><a href="#" onclick="viewRecord(' + response[i].id + ')"><i class="fas fa-eye"></i></a></span>';

                    row += '</td>';

                    row += '</tr>';

                    $(".expbody").html(row);
                }
            } else {
                var noDataRow = '<tr><td colspan="6" class="text-center">No Data Available</td></tr>';
                $(".expbody").html(noDataRow);

            }
        },
        error: function () {
            alert("Data not found");
        }
    });

    }
   
    $('#deviceForm').submit(function (e) {
        e.preventDefault(); 
        var formData = {
            product: $('#product').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            created: $('#created').val(),
        };

        $.ajax({
            url: '/Device/AddDevice',
            type: 'POST',
            data: formData,
            success: function (response) {
                Swal.fire({
                    title: "Success!",
                    text: "Data Added Successfully!",
                    icon: "success"
                });
                //  alert("Device added successfully!");
                getall();
                $("#deviceform").hide();
                $('#deviceForm')[0].reset(); 
                $("#device_list").show();

            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error occurred while adding device!",
                });
                // alert("Error occurred while adding device");
            }
        });
    });




})

function getall() {
    $.ajax({
        url: '/Device/GetAllProducts',
        type: 'GET',
        dataType: 'JSON', // Correct dataType
        success: function (response) {
            var row = '';
            var tableBody = $("#expbody tbody");

            tableBody.empty(); 
            if (response && response.length > 0) {
                console.log(response);  

                for (var i = 0; i < response.length; i++) {

                    row += '<tr>';
                    row += '<td>' + response[i].id + '</td>';
                    row += '<td>' + response[i].product + '</td>';
                    row += '<td>' + response[i].price + '</td>';
                    row += '<td>' + response[i].description + '</td>';
                    row += '<td>' + response[i].created + '</td>';
                    //row += '<td>' + response[i].amount + '</td>';
                    row += '<td class="action-icons">';

                    row += '<span><a  onclick="editRecord(' + response[i].id + ')"><i class="fas fa-edit"></i></a></span> ';

                    row += '<span><a href="#" onclick="deleteRecord(' + response[i].id + ')"><i class="fas fa-trash"></i></a></span>';

                    row += '<span><a href="#" onclick="viewRecord(' + response[i].id + ')"><i class="fas fa-eye"></i></a></span>';

                    row += '</td>';

                    row += '</tr>';

                    $(".expbody").html(row);
                }
            } else {
                var noDataRow = '<tr><td colspan="6" class="text-center">No Data Available</td></tr>';
                $(".expbody").html(noDataRow);

            }
        },
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    });

}


function updaterecord() {


    var formData = {
        product: $('#product').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        created: $('#created').val(),
    };

    var id = $("#deviceId").val();
    $.ajax({
        url: '/Device/UpdateDevice?id=' + id,
        type: 'POST',
        data: formData,
        success: function (response) {
            Swal.fire({
                title: "Success!",
                text: "Data Updated successfully!",
                icon: "success"
            });
            $("#deviceform").hide();
            $('#deviceForm')[0].reset(); 
            $("#device_list").show();
            getall();

            window.location.reload
        },
        error: function () {
            alert("Error occurred while adding device");
        }
    });



}


function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        $.ajax({
            url: '/Device/DeleteRecord?id=' + id,
            type: 'POST',
            success: function () {

                Swal.fire({
                    title: "Success!",
                    text: "Data Deleted Successfully!",
                    icon: "success"
                });

               // alert("Record deleted successfully!");
                getall();            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete record: " + error,
                    icon: "error"
                });

                //alert("Failed to delete record: " + error);
            }
        });
    }
}
function editRecord(id) {

    $("#deviceform").show();
    $("#device_list").hide();
    $.ajax({
        url: '/Device/getDeviceById?id=' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data) {
                updatedevice();
                // Populate the form fields with the data
                $('#deviceId').val(data[0].id);
                $('#product').val(data[0].product);
                $('#description').val(data[0].description);
                $('#price').val(data[0].price);
                $('#created').val(data[0].created); // Adjust format if needed
                
            }
        },
        error: function (xhr, status, error) {
            alert("Failed to fetch record: " + error);
        }
    });
}
function viewRecord(id) {

    $("#device_view").show();
    $("#device_list").hide();

    $.ajax({
        url: '/Device/getDeviceById?id=' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data) {
                // Populate the form fields with the data
               // $('#deviceId').val(data[0].id);
                $('#device_product').html(data[0].product);
                $('#device_price').html(data[0].price);
                $('#device_desc').html(data[0].description); // Adjust format if needed

            }
        },
        error: function (xhr, status, error) {
            alert("Failed to fetch record: " + error);
        }
    });
}



function addexp() {

    $("#deviceform").show();
    $("#device_list").hide();

}

function closedevice() {

    $("#deviceform").hide();
    $('#deviceForm')[0].reset(); // Reset all fields in the form
    $("#device_list").show();

}


function updatedevice() {

    $("#save").hide()
    $("#update").show()

}

function hideview() {
    $("#device_view").hide()
    $("#device_list").show();

}
