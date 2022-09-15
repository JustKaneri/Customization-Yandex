GetAllElements();

async function GetAllElements(){
	let tab = await chrome.tabs.query({ active: true, currentWindow: true });
	console.log(tab[0].window);
}