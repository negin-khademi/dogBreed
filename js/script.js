$(document).ready(function() {

    // first page display block, others display none
    // click search box and go to the second page
    // Get data from input and send it to the next page
    // $("#first-div").css("display", "none");
    $("#second-div").css("display", "none");
    $("#third-div").css("display", "none");
    $("#myBtn").click(function() {
            $("#first-div").fadeOut(function() {
                $("#second-div").fadeIn();
                var searchResult = document.getElementById("searchResult");
                searchResult.innerHTML = document.getElementById("tags").value;
            });
        })
        // Get information from api and use autocomplete function for input
    var availableTags = $.ajax({
        url: "https://dog.ceo/api/breeds/list/all",
        type: "GET",
        dataType: "json",
        success: function(dogName) {
            let newArr = [];
            Object.keys(dogName.message).map(function(key, index) {
                newArr.push(key)
                    // newArr = [
                    //     ...newArr
                    //     // ,...dogName.message[key]
                    // ]
                    // newArr2 = [...newArr,...dogName.message[key]]
            });
            console.log(newArr);
            console.log(newArr.length);
            // console.log(newArr2);
            $("#tags").autocomplete({
                source: newArr
            });

        }

    });

    // click previous key to return to the first page
    $("#myBtn2").click(function() {
            $("#second-div").fadeOut(function() {
                $("#first-div").fadeIn();
            });
        })
        // click one of the buttons and go to the third page
    $(".myBtn3").click(function() {
            $("#second-div").fadeOut(function() {
                $("#third-div").fadeIn();
            });
        })
        // click previous key to return to the second page
    $("#myBtn4").click(function() {
        $("#third-div").fadeOut(function() {
            $("#second-div").fadeIn();
        });
    })

});