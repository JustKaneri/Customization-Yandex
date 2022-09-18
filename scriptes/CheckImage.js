var inputSrc = document.getElementsByClassName('input_src')[0];
const img = document.getElementsByClassName('img')[0];

chrome.windows.getAll({populate:true},getAllOpenWindows);
var tabId = 0;

function getAllOpenWindows(winData) {
  var tabs = [];
  for (var i in winData) {
      console.log(winData[i]);
    if (winData[i].focused === true) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j=0; j<totTabs;j++) {
         if(winTabs[j].url == "https://ya.ru/"){
            tabId = winTabs[j].id;
         }
        }
    }
  }
}

window.addEventListener('load', (event) => {
 	var img = localStorage.getItem('img');
 	inputSrc.value = img;
	inputSrc.style.borderColor = 'green';
});


inputSrc.oninput = () => {
	console.log(inputSrc.value);
	if(inputSrc.value == ''){
		inputSrc.style.borderColor = 'gray';
		SendMes('url^');
		localStorage.removeItem('img');
	}
	else{
		inputSrc.style.borderColor = 'green';
		img.src = inputSrc.value;
		localStorage.setItem('img',inputSrc.value);
		SendMes('url^'+ inputSrc.value);	
	}
}


img.onerror = function () {
  inputSrc.style.borderColor = 'red';
  localStorage.removeItem('img');
};


async function SendMes(mes){

	chrome.tabs.sendMessage(tabId, {greeting: mes}, function(response)
	{
	    console.log('ok');
	});
}
