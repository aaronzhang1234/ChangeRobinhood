GREEN = "rgb(0,200,5)"
RED = "rgb(255,80,0)"


document.getElementById("change_theme").addEventListener("click", changeThemeClick);
document.getElementById("flip_graph").addEventListener("click", flipGraph);

function changeThemeClick(){
    sendMessage("change");
}

function flipGraph(){
    sendMessage("flip");
}

sendMessage("theme")

function sendMessage(type){
    chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message":type},function(response){
            changeTheme(response);
        })
    })
}

function changeTheme(theme){
    if(theme == "G"){
        document.getElementById("change_theme").checked=true;
    }else if(theme=="R"){
        document.getElementById("change_theme").checked=false;
    }
}