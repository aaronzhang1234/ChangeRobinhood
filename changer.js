GREEN =  "rgb(0,200,5)"
LIGHT_GREEN = "rgba(255,80,0,0.4)"
RED = "rgb(255,80,0)"
LIGHT_RED = "rgba(0,200,5,0.4)"

rh_theme = "";


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        switch(request["message"]){
            case "change":
                sendResponse(rh_theme==GREEN?"R":"G")
                changeTheme()
                break;
            case "theme":
                sendResponse(rh_theme==GREEN?"G":"R")
                break;
            case "flip":
                flip_chart()
                sendResponse("D")
                break;
        }
    }
)

var observer = new MutationObserver(function (mutations, me){
    rh_theme = getComputedStyle(document.body).getPropertyValue("--rh__primary-base");
    GREEN = getComputedStyle(document.body).getPropertyValue("--rh__semantic-positive-base")
    LIGHT_GREEN = getComputedStyle(document.body).getPropertyValue("--rh__semantic-positive-light")
    RED = getComputedStyle(document.body).getPropertyValue("--rh__semantic-negative-base")
    LIGHT_RED = getComputedStyle(document.body).getPropertyValue("--rh__semantic-negative-light")
})
observer.observe(document,{
    childList:true,
    subtree:true
})

function changeTheme(){
    if(rh_theme == GREEN){
        document.body.style.setProperty("--rh__primary-base", RED);
        document.body.style.setProperty("--rh__primary-light-base",LIGHT_RED );
    }
    if(rh_theme == RED){
        document.body.style.setProperty("--rh__primary-base", GREEN);
        document.body.style.setProperty("--rh__primary-light-base", LIGHT_GREEN);
    } 
    rh_theme = getComputedStyle(document.body).getPropertyValue("--rh__primary-base");
}
function flip_chart(){
    let chart = document.getElementById("sdp-price-chart-graph"); 
    if(chart){ 
        chart_line = chart.firstChild.firstChild.firstChild;
        chart_line.style.transform = chart_line.style.transform=="scaleY(-1)"?"":"scaleY(-1)";
    }
}