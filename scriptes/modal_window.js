const buttonOpen = document.getElementsByClassName('btn_open')[0];
const buttonClose = document.getElementsByClassName('button_close')[0];
const modalWindow = document.getElementsByClassName('selected-window')[0];

console.log(modalWindow);

buttonOpen.onclick = () =>{
	modalWindow.style.visibility = 'visible';
};

buttonClose.onclick = () => {
	modalWindow.style.visibility = 'hidden';
}

