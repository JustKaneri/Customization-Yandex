const defaultBackColor = [{key:'--color-g-bg-primary',color:'#fff'}]
const defaultTextColor = [{key:'--color-g-bg-fill-12',color:'#0000001f'},
                          {key:'--color-g-text-primary',color:'#000'},
                          {key:'--color-g-text-quaternary',color:'#00000073'},
                          {key:'--color-g-text-quinary',color:'#00000052'}];   


window.addEventListener('load', (event) => {
  UpdateText();
  UpdateBackground();
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse)  {
    console.log("from the extension");
    let answer  = recognitionMessage(request.greeting);
    console.log(request.greeting);
    if(answer == 'ok'){
      sendResponse({farewell: "greet!"});
      window.postMessage({ type: "FROM_SCRIPT", text: "all ok"}, "*");
    }
});


function recognitionMessage(text){
    if(text !== 'drop'){
        let key = text.split(':')[0];
        let value = text.split(':')[1];
        SaveConfig(key,value);
        if(key == 'back'){
          UpdateBackground();
        }
        else{
          UpdateText();
        }

        return 'ok';
    }
    else if(text === 'drop')
    {
      localStorage.clear();
      SetDefaultValue();
      return 'ok';
    }

    return 'not correct message';
}

function SaveConfig(key,value){
  localStorage.setItem(key,value);
}

function SetDefaultValue(){

    defaultBackColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, value.value);
    })  

    defaultTextColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, value.value);
    })  
}

function UpdateBackground(){

  let color = localStorage.getItem('back');

  defaultBackColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, color);
  })  
}

function UpdateText(){

  let color = localStorage.getItem('text');

  defaultTextColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, color);
  })  
}
