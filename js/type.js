let ready=false;
let runready=false;
settime=10;
const point=document.querySelector(".point");
const inputword=document.querySelector(".word-input");
const word=document.querySelector(".word");
const watch=document.querySelector(".time");
const button=document.querySelector(".button");
const speedone=document.querySelector(".one");
const speedtwo=document.querySelector(".two");
const speedthree=document.querySelector(".three");
const speednumber=document.querySelector(".speednumber");
const num=document.querySelector(".num");
const numb=document.querySelector(".numb");

const url="https://random-word-api.herokuapp.com/word?number=100"
worddisplay=[];
let score=0;
const makeword=()=>
{
    axios.get(url).then(res=>{

        worddisplay=res.data.filter(wor=>wor.length<8);
        button.innerText="게임시작";
        button.classList.remove("loading");
        ready=true;
    }).catch(error=>console.log(error))
    
}
runtoast=(text)=>{
    const option={
        text:text,
        duration:3000,
        newWindow:true,
        gravity:top,
        position:"left",
        background:"linear-gradient(#00b09b,#96c3d)"
    }
    Toastify(option).showToast()
}

init=()=>{
    makeword()
}
const time=()=>{
    
    if(timer>0)
    {
        ready=false;
        timer--;
        
    }
    else if(timer==0){
        runready=false;
        ready=true;
        clearInterval(timecount);
    
    }
    watch.innerText=timer;
}

const run=()=>{
    
    if(ready===false)
        return;
    runready=true;
    
    inputword.value= "";
    const ranindex=Math.floor(Math.random()*worddisplay.length)
    word.innerText=worddisplay[ranindex];
    score=0;
    point.innerText=score;
    timer=settime;
    switch(speednumber.innerText){
        case '1':
            timer=settime;
        break;
        case '2':
            timer=8;
        break;
        case '3':
            timer=6;
        break;
    }
    timecount=setInterval(time,1000);
}
const getword=()=>{
    if (runready===false)
            return;
    if(inputword.value.toUpperCase()===word.innerText.toUpperCase())
    {
        
        runtoast(word.innerText);
        score++;
        inputword.value= "";
        timer=settime
        watch.innerText=timer;
        const ranindex=Math.floor(Math.random()*worddisplay.length)
        word.innerText=worddisplay[ranindex];
        
    }
    point.innerText=score;
    console.log(word.innerText)
}

init();
inputword.addEventListener("input",getword);
speedone.addEventListener("click",res=>{
    speednumber.innerText=1;
})
speedtwo.addEventListener("click",res=>{
    speednumber.innerText=2;
})
speedthree.addEventListener("click",res=>{
    speednumber.innerText=3;
})
numb.addEventListener("click",()=>{
    settime= num.value;
    num.value="";
})

