$(document).ready(function () {

    var availableTags = $.ajax({
        url: "https://dog.ceo/api/breeds/list/all",
        type: "GET",
        dataType: "json",
        success: function (dogName) {
            let newArr = [];
            Object.keys(dogName.message).map(function (key, index) {
                newArr.push(key)
                // newArr = [
                //     ...newArr
                //     // ,...dogName.message[key]
                // ]
                // newArr2 = [...newArr,...dogName.message[key]]
            });

            // console.log(newArr);

            // console.log(newArr.length);
            $("#tags").autocomplete({
                source: newArr
            });

            // press button and see the list of dog breed
            // $("#myBtn").click(function (e) {
            //     getDogBreed(this.innerText)
            // });

        }

    });
    // get information from costume and return it.
    function getInputTagValue() {
        const result = document.getElementById("tags").value;
        return result;
    };
    // If a form field (fname) is empty, this function alerts a message, and returns false,
    //  to prevent the form from being submitted. 
    function validateForm() {
        if (getInputTagValue() == "") {
            alert("Name must be filled out");
            return false;
        }
    };
    // first page display block, others display none
    // click search box and go to the second page
    // Get data from input and send it to the next page

    $("#second-div").css("display", "none");
    $("#third-div").css("display", "none");
    $("#myBtn").click(function () {

        if (getInputTagValue() == "") {
            validateForm();
        } else {
           $.ajax({
            url: "https://dog.ceo/api/breed/" + getInputTagValue() + "/list",
            success: function (response){
                if (response.message?.length) {
                    alert("this dog breed has not got any types");
                }
                else{
                    $("#first-div").fadeOut(function () {
                        $("#second-div").fadeIn();
                    });
                }
                console.log(response);
            }
           });
        }

    })
    
})