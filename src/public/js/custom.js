window.onload = function () {
    // let toggleDropdown = document.getElementById("profile-toggle");
    let elemmentDropdownUser = document.getElementById("user-dropdown");
    document.addEventListener("mouseup", function (e) {

        if (e.target.id === 'profile-toggle') {
            let statusDisplay = elemmentDropdownUser.style.display === "block" ? "none" : "block";
            elemmentDropdownUser.style.display = statusDisplay;
        } else {
            if (elemmentDropdownUser) {
                elemmentDropdownUser.style.display = "none";
            }
        }
    });

    // Click input 
    // let buttonAvatar = document.getElementById("button-choose-image");
    // if (buttonAvatar) {
    //     let inputAvatar = document.getElementById("profile-avatar");
    //     buttonAvatar.addEventListener("click", () => {
    //         inputAvatar.click();
    //     });

    //     inputAvatar.addEventListener("change", (e) => {
    //         if (inputAvatar.files && inputAvatar.files[0]) {
    //             preview_image(e);
    //         }
    //     })

    // }

}
// function preview_image(event) {
//     var reader = new FileReader();
//     reader.onload = function () {
//         var inputAvatar = document.getElementById('profile-avatart-image');
//         inputAvatar.src = reader.result;
//     }
//     reader.readAsDataURL(event.target.files[0]);
// }
