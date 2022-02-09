$(document).ready(function () {
    // If a form field (fname) is empty, this function alerts a message, and returns false,
    //  to prevent the form from being submitted.
    function validateForm(){
        let x = document.forms["myForm"]["fname"].value;
        if (x == "") {
            alert("Name must be filled out");
            return false;
        }
    }
    //    variables
    let selector = {
        id : {
            firstDiv :'first-div',
            secondDiv : 'second-div',
            thirdDiv : 'thirdDiv',
        },
        class :{
            first : 'first-page',
            second : 'second-page',
            third : 'third-page'
        },

    };

    // first page display block, others display none
    // click search box and go to the second page
    // Get data from input and send it to the next page

    $("#second-div").css("display", "none");
    $("#third-div").css("display", "none");
    $("#myBtn").click(function () {
        let x = document.forms["myForm"]["fname"].value;
        if (x == "") {
            validateForm();
        }else{
            $("#first-div").fadeOut(function () {
            $("#second-div").fadeIn();
            var searchResult = document.getElementById("searchResult");
            searchResult.innerHTML = document.getElementById("tags").value;
        });
        }
        
    })
    // create keys and pass information to them

    // Get information from api and use autocomplete function for input
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

            console.log(newArr.length);
            $("#tags").autocomplete({
                source: newArr
            });

            // press button and see the list of dog breed
            $("#myBtn").click(function(e){
                getDogBreed(this.innerText)
            });

        }

    });

    // create getDogBreed function
    // performance of this function is give us a list of dogBreed 
    // related to dogName we chose before
     
    var getDogBreed = function(dogType){
        console.log(dogType);
        $.ajax({
            url: "https://dog.ceo/api/breed/" + dogType + "/list",success:function (result){
                const createKeys = document.getElementById("createKeys");
                createKeys.innerHTML = "";
                for(let i =0 ;i < dogType.length ;i++){
                    const rowCls = ["row" ,"row-cols-2" ,"row-cols-md-4" ,"row-cols-lg-6" ,"gy-3" ,"justify-content-center" , "mx-auto" ,"d-flex" ,"text-center" ,"gx-3"];
                    createKeys.classList.add(...rowCls);
                    let column = document.createElement("div");
                    document.getElementById("createKeys").appendChild(column);
                    column.classList.add("col","col-btn");
                    let myButton = document.createElement("button");
                    const colCls = ["glow-on-hover" ,"p-5" ,"d-flex" ,"align-items-center" ,"myBtn3" ];
                    myButton.classList.add(...colCls);
                    

                 }//end for loop
            } // end function(result)
         }) //end ajax 
    }//end dogtype function  

    // click previous key to return to the first page
    $("#myBtn2").click(function () {
        $("#second-div").fadeOut(function () {
            $("#first-div").fadeIn();
        });
    })
    // click one of the buttons and go to the third page
    $(".myBtn3").click(function () {
        $("#second-div").fadeOut(function () {
            $("#third-div").fadeIn();
        });
    })
    // click previous key to return to the second page
    $("#myBtn4").click(function () {
        $("#third-div").fadeOut(function () {
            $("#second-div").fadeIn();
        });
    })

});