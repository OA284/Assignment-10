var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var siteArr = [];

if (localStorage.getItem("siteArr") != null){
    siteArr = JSON.parse(localStorage.getItem("siteArr"));
    displayData();
}
else{
    siteArr = [];
}

function errorName(){
    var regex = /[^]/g;

    if (regex.test(siteNameInput.value) == true){
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        return true;
    }
    document.getElementById("nameAlert").classList.replace("d-none", "d-block");
    return false;
}

function errorUrl(){
    var regex = /^((www.)[a-z]{0,30}(.com)|(WWW.)[a-z]{0,30}(.COM))$/g;

    if (regex.test(siteUrlInput.value) == true){
        document.getElementById("urlAlert").classList.replace("d-block", "d-none");
        return true;
    }
    document.getElementById("urlAlert").classList.replace("d-none", "d-block");
    return false;
}

function main(){
    if (errorName() == true && errorUrl() == true){
        var site = {
            sni: siteNameInput.value,
            sui: siteUrlInput.value
        };
        siteArr.push(site);
        localStorage.setItem("siteArr", JSON.stringify(siteArr));
        clearInput();
        displayData();
    }

}

function clearInput(){
    siteNameInput.value = "";
    siteUrlInput.value = ""
}

function displayData(){
    var content = "";
    for(var i=0; i < siteArr.length; i++){
        content += `<tr class="text-center">
                        <td>${i+1}</td>
                        <td>${siteArr[i].sni}</td>
                        <td><a href="https://${siteArr[i].sui}" target="_blank" class="text-decoration-none text-white"><button class="btn btn-green text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                        <td><button class="btn btn-red text-white" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>`;
    }
    document.getElementById('displayOutput').innerHTML = (content);
}

function deleteProduct(index){
    siteArr.splice(index, 1);
    displayData();
    localStorage.setItem("siteArr", JSON.stringify(siteArr));
}