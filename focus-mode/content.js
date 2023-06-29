
console.log(window.location.href)

function messaging(){
chrome.runtime.sendMessage({greeting: "hello"});
};


// receive response
chrome.runtime.onMessage.addListener(gotMessage)
function gotMessage(request, sender, sendResponse) {
    console.log(request.farewell)
    if(request.farewell === "goodbye"){
      location.reload();
    }
    
}    
;


url = window.location.href




const storedTodoz = new Promise((resolve) => {
  chrome.storage.local.get(['todoz'], function(result) {
    const item = result.todoz;
    console.log(JSON.stringify(item));
    resolve(item);
  });
});



const stored = storedTodoz.then((item) => {
  // console.log(item);
  const check = checkAllNotChecked(item)
  console.log(check)
  return check// Use the item here or perform further operations
});

async function checking(){
const done = await stored
if (done){
  console.log(`checking is ${done}`)
  return true
}
else{
  console.log(`checking is ${done}`)
  return false
}
}


const blockedUrls = ['youtube.com', 'instagram.com', 'pinterest.com','spotify.com','tiktok.com'];

async function block(){
  if(await checking()==false && blockedUrls.some(url => window.location.href.includes(url))){
    // location.reload();
    document.body.style.display = 'none';
    window.location.href = 'https://static0.thethingsimages.com/wordpress/wp-content/uploads/2021/11/dwayne-johnson-peoples-eyebrow.png'
    }
    
}

function checkAllNotChecked(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked === false) {
        return false;
      }
    }
    return true;
  }


  block()
