const defaultBackColor = [{key:'--color-g-bg-primary',color:'#ffffff'},
                          {key:'--color-g-bg-secondary',color:'#ffffff'}];
                          
const defaultTextColor = [{key:'--color-g-bg-fill-12',color:'#0000001f'},
                          {key:'--color-g-text-primary',color:'#000'},
                          {key:'--color-g-text-quaternary',color:'#00000073'},
                          {key:'--color-g-text-quinary',color:'#00000052'}];   

const Back = document.getElementsByClassName('body__wrapper')[0];

window.addEventListener('load', (event) => {
  UpdateText();
  UpdateBackground();
  SetImageBacground();
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse)  {
    console.log(request.greeting);
    let answer  = recognitionMessage(request.greeting);
    if(answer == 'ok'){
      sendResponse({farewell: "greet!"});
      window.postMessage({ type: "FROM_SCRIPT", text: "all ok"}, "*");
    }
});


function recognitionMessage(text){
    if(text !== 'drop'){
        let key = text.split('^')[0];
        let value = text.split('^')[1];
        SaveConfig(key,value);
        if(key == 'back'){
          UpdateBackground();
        }else
        if(key == 'url' || key ==  'opac'){
          SetImageBacground();
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

    Back.style.background = null;
    localStorage.removeItem('back');
    localStorage.removeItem('text');
    localStorage.removeItem('opac');
    localStorage.removeItem('img');
}

function UpdateBackground(){
  let color = localStorage.getItem('back');

  defaultBackColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, color);
  })  

  if(localStorage.getItem('url') != null){
    SetImageBacground();
  }
}

function UpdateText(){

  let color = localStorage.getItem('text');

  defaultTextColor.map((value)=>{
      document.documentElement.style.setProperty(value.key, color);
  })  
}

function SetImageBacground(){

    if(localStorage.getItem('url') == null){
      Back.style.background = null;
      return;
    } 

    var res;
    if(localStorage.getItem('back') === null){
      res = hexToRgb(defaultBackColor[0].color);
    }
    else{
      res = hexToRgb(localStorage.getItem('back'));
    }
    
    var opac = 1;
    if(localStorage.getItem('opac') !== null)
      opac = localStorage.getItem('opac')/10;

    console.log('back is install');
    var rgb = 'rgb(' + res.r + ', ' + res.g + ', ' + res.b + ', '+ opac +')';
    Back.style.background = "linear-gradient(0deg, "+rgb+" 0.64%, "+rgb+" 100%),url("+localStorage.getItem('url')+")  center center / cover no-repeat ";

}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}