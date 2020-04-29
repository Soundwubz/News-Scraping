$('#commentSubmit').on("click", () => {
    var thisId = $("#comment").attr('data-art-id');

    $.ajax({
        method: "POST",
        url: "/comment/" + thisId,
        data: {
            comment: $('#comment').val()
        }
    }).then((data) => {
        //log response
        console.log(data);
    }).catch((err) => {
        console.error(err);
    })
});

$('#viewComments').on("click", () => {
    var thisId = $('#viewComments').attr('data-art-id');
    var getUrl = "/comment/" + thisId;

    $.get(getUrl, (data) => {
        console.log(data);
    })
})