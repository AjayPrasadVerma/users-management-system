$("#add-user").submit(function (event) {
    alert("Data inserted successfully");
})

$('#update_user').submit(function (event) {
    event.preventDefault();
    const unindexed_array = $(this).serializeArray();
    console.log(unindexed_array);

    const data = {};
    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    })

    // console.log(data);

    const req = {
        "url": `http://localhost:5000/api/users/${data.id}`,
        'method': 'PUT',
        'data': data
    }

    $.ajax(req).done(function (res) {
        alert("data Updated successfully");
        location.reload();
    })
})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        const id = $(this).attr("data-id");

        const req = {
            "url": `http://localhost:5000/api/users/${id}`,
            'method': 'DELETE',
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(req).done(function (res) {
                alert("data Deleted successfully");
            })
            location.reload();
        }
    })
}