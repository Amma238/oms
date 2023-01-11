var dataTables;
$(document).ready(function () {
    loadDataTable();
});


function loadDataTable() {
    dataTables = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/Book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "bookName", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "bookId",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href='/BookList/Upsert?id=${data}' class='btn btn-success text-white' style='cursor:pointer ;width:100px'>
                                   Edit
                                </a>
                                &nbsp
                                <a  class='btn btn-danger text-white' style='cursor:pointer;width:100px'
                                    onclick=Delete('/api/Book?id='+${data})>
                                   Delete
                                </a>
                            </div>`;
                }, width: "30%"

            }

        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted,you will not be able to recover it",
        icon: "warning",
        buttons:true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTables.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }

                }
            });
        }
    });
}