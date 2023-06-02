function get_password () {
    var password_receive = document.getElementById('password').value;
    var password_again_receive = document.getElementById('password_again').value;
    var account_receive = window.sessionStorage.getItem("account");
    console.log(account_receive);
    if (password_receive != password_again_receive) window.alert("两次输入的密码不同！");
    else {
        var re=/select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/i;
        if (re.test(password_receive) || re.test(account_receive)) window.alert("输入信息存在特殊符号！");
        else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200){
                    window.alert("successfully");
                    location.href = '../Login/Login.html';
                }
            };
            xhttp.open("POST","/server/Modify.php",true);
            var send_message = "password=" + password_receive + "&account=" + account_receive;
            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send(send_message);
        }
    }
}
