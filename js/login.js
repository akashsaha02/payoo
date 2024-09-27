document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault();
    let mobile = document.getElementById("mobile-input").value;
    let pin = document.getElementById("pin-input").value;


    if (isNaN(mobile) || mobile.length != 10) {
        alert("Mobile number is not valid");
        mobile.value = "";
        return;
    }
    
    if (isNaN(pin) || pin.length != 4) {
        alert("Pin number is not valid");
        pin.value = "";
        return;
    }

    if(mobile == "1234567890" && pin == "1234"){
        alert("Login successful");
        window.location.href = "../dashboard.html";
    }
    console.log("Login button clicked");
  
});