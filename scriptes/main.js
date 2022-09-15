chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) 
  {
    console.log("from the extension");
    if (request.greeting == "all ok")
	{
     sendResponse({farewell: "greet!"});
	 window.postMessage({ type: "FROM_SCRIPT", text: "all ok"}, "*");
	}
  }
 );