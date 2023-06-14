let wordData=[]         // 단어 데이터 배열
let currentIndex=0      // 현재 문제 인덱스
let correctA=0          // 정답 수

// csv 파일 불러오기
function handleFileUpload(event){
    const file=event.target.files[0]
    const reader=new FileReader()
    
    reader.onload=(e)=>{
        const contents=e.target.result
        const data=CSVToArray(contents)     // CSV 데이터를 배열로 변환하는 함수 호출
        wordData=data                       // 단어 데이터 저장
        
        // const btnStart=document.createElement("button")
        const btnStart=document.querySelector(".btn-start")
        btnStart.textContent="Words Test Start! ("+wordData.length+" Questions)"
        
        btnStart.addEventListener("click",()=>{
            showQuestion()  // 시작 버튼 클릭하면 첫 번째 문제 보여주기
        })            
    }
    reader.readAsText(file)
}

// 배열을 셔플
function shuffleArray(array) {
    for (let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i + 1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    // console.log(array)
}

// csv 파일을 배열로 변환
function CSVToArray(csvString){
    const rows=csvString.split("\n")
    const data=[]
    
    for(const row of rows){
        data.push(row.split(","))
    }
    
    shuffleArray(data)      // 셔플 적용
    // console.log(data);

    return data
}

function showQuestion() {
    const container=document.querySelector("#container")
    const word=wordData[currentIndex][0]
    const answer=wordData[currentIndex][1]
    
    const span1=document.createElement("span")
    const question=document.createElement("p")

    // 기존 내용 제거
    // container.innerHTML=""
    container.querySelector(".txt-1").textContent = "";

    // 문제 표시
    // span1.textContent=`${currentIndex+1} of ${wordData.length}`
    const txt=document.querySelector("#txt")
    span1.textContent=`Question ${currentIndex+1}`           
    question.textContent=answer
    txt.appendChild(span1)
    txt.appendChild(question)
    // console.log(answer);

    // 입력 폼 표시
    const form=document.createElement("div")
    form.id="form"
    txt.appendChild(form)
    const input=document.createElement("input")
    input.type="text"
    input.placeholder="답 적으셈"
    form.appendChild(input)
    input.focus()       // 포커스 이동

    // 엔터 키 입력 시 제출
    input.addEventListener("keydown",(event)=>{
        if (event.keyCode===13){
            event.preventDefault()                  // 기본 동작인 폼 제출 막기
            const inputValue=input.value.trim()     // 입력 값에서 공백 제거
            if (inputValue===""){
                alert("답 적으셈.")         // 빈 값이면 경고 메시지 표시
                return
            }
            checkAnswer(word,inputValue)
            form.innerHTML = "";
        }
    });

    // 제출 버튼 표시
    const submitBtn=document.createElement("button")
    submitBtn.textContent="submit"
    submitBtn.addEventListener("click",()=>{
        const inputValue=input.value.trim()     // 입력 값에서 공백 제거
        if (inputValue==="") {
            alert("답 적으셈.")         // 빈 값이면 경고 메시지 표시
            return
        }
        checkAnswer(word,inputValue)
        form.innerHTML = "";
    })
    form.appendChild(submitBtn)

}

function checkAnswer(word,userAnswer){
    const result1=document.createElement("p")
    result1.id="result1"
    txt.appendChild(result1);
    // const result=document.getElementById("result");
    if (word.toLowerCase()===userAnswer.toLowerCase()){
        // result.textContent="맞음"
        result1.textContent="맞음"
        correctA++
    } else {
        // result.textContent=`틀림 (정답: ${word})`
        result1.textContent=`틀림 (정답: ${word})`
    }
    console.log(correctA)
    currentIndex++

    // 모든 문제를 다 풀었을 경우
    if (currentIndex===wordData.length){
        const txt=document.querySelector("#txt");
        form.innerHTML = "";

        const score=Math.round((correctA/currentIndex)*100*100)/100
        const wrapResult=document.createElement("div")
        const completionMsg=document.createElement("span")
        const retestBtn=document.createElement("button")
        container.appendChild(wrapResult)
        wrapResult.appendChild(completionMsg)
        wrapResult.appendChild(retestBtn)
        retestBtn.textContent="다시하실?"
        retestBtn.id="btn-retest"
        completionMsg.textContent=`${currentIndex}문제 중 ${correctA}문제 맞춤(${score}점)`

        if(score===100){
            const perfect=document.querySelector("#perfect")
            perfect.style.display="block"
            setTimeout(()=>{
                perfect.style.display="none"
            },3000)
        }else if(score<=50){
            const poor=document.querySelector("#poor")
            poor.style.display="block"
            setTimeout(()=>{
                poor.style.display="none"
            },3000)
        }else{
            const yet=document.querySelector("#yet")
            yet.style.display="block"
            setTimeout(()=>{
                yet.style.display="none"
            },3000)
        }
        
        retestBtn.addEventListener("click",()=>{
            
            txt.innerHTML = "";
            wrapResult.innerHTML = "";
            currentIndex = 0;
            correctA = 0;
            showQuestion();
        })

    } else {
        showQuestion();
    }
}