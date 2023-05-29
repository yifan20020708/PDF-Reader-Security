function get_input() {
    var account_input = document.getElementById('input_account').value;
    if (account_input == '') {
        window.alert('输入的帐号不可为空！');
    }
    else {
        //document.getElementById('question_back').submit();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                if(this.responseText.length == 9) window.alert('此帐号并没有被注册！');
                else {
                    document.getElementById("question_show_area").innerHTML = this.responseText;
                }
            }
        };
        xhttp.open("POST","/server/Forgot_verify.php",true);
        var send_message = "account=" + account_input;
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhttp.send(send_message);
    }
}

function verify() {
    var account_input = document.getElementById('input_account').value;
    var answer_input = document.getElementById('input_answer').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.responseText);
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText.length<=15) {
                window.alert('此帐号并没有被注册！');
            }
            else if (this.responseText == 'verify result:Fail to verify,your answer is wrong!') {
                window.alert(this.responseText);
            }
            else {
                window.sessionStorage.setItem("account",account_input);
                location.href = '../Modify_password/Modify_password.html';
            }
        }
    };
    xhttp.open("POST","/server/Forgot_verify_phase_two.php",true);
    var send_message = "account=" + account_input + "&answer=" + answer_input;
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}

