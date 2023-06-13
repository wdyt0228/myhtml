// Calendar
const currentTitle=document.getElementById('current-year-month')    // 현재 달
const calendarBody=document.getElementById('calendar-body')         // 캘린더 전체 div
let today=new Date()
const today1=new Date()
let first=new Date(today.getFullYear(), today.getMonth(),1)       // 현재 년과 월을 사용하여 첫번째 날을 나타냄
const dayList=['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
const monthList=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
const leapYear=[31,29,31,30,31,30,31,31,30,31,30,31]        // 윤년
const notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31]     // 평년
let pageFirst=first   // 해당 월의 첫째 날
let pageYear    // 윤년인지 평년인지 파악할때 사용

// 공휴일
const holidays=[
    {month:0,day:1,name:"신정"},
    {month:2,day:1,name:"삼일절"},
    {month:4,day:5,name:"어린이날"},
    {month:5,day:6,name:"현충일"},
    {month:7,day:15,name:"광복절"},
    {month:9,day:3,name:"개천절"},
    {month:9,day:9,name:"한글날"},
    {month:11,day:25,name:"성탄절"}
]
// 시작 년도와 끝 연도를 지정하여 각 연도마다 새로운 공휴일(date)을 생성 후 배열에 추가
function generateHolidays(startYear,endYear) {
    const holidayList=[]
    for (let year=startYear;year<=endYear;year++) {
        holidays.forEach(holiday=>{
            holidayList.push(new Date(year,holiday.month,holiday.day))
        })
    }
    return holidayList
}
const holiday=generateHolidays(1900,2100)  // 1900년 ~ 2100년까지
// date가 휴일인지 아닌지 판별
// function isHoliday(date){
//     const year=date.getFullYear()
//     const month=date.getMonth()
//     const day=date.getDate()
//     return holiday.some(holidayDate=>holidayDate.getFullYear()===year&&holidayDate.getMonth()===month&&holidayDate.getDate()===day)
// }
function isHoliday(date) {
    const month=date.getMonth()
    const day=date.getDate()
    for (const holiday of holidays) {
        if (holiday.month===month&&holiday.day===day){
        return true
        }
    }
    return false
}
    
// 날짜 마우스 오버 이벤트
function handleDateMouseOver(e) {
    e.currentTarget.classList.add('date-hover')
}

// 달력 보여줌
function showCalendar(){
    let monthCnt=100    // 주
    let cnt=1           // 일
    // 윤년 확인
    if(first.getFullYear()%4===0&&first.getFullYear()%100!==0||first.getFullYear()%400===0){
        pageYear=leapYear
    }else{
        pageYear=notLeapYear
    }
    currentTitle.innerHTML=`${first.getFullYear()}년 ${monthList[first.getMonth()]}`;   // 달력 상단에 년도와 월을 출력
    for(let i=0;i<6;i++){                           // 6개의 주를 생성
        const tr=document.createElement('tr')       // tr 생성
        tr.setAttribute('id',monthCnt)
        for(let j=0;j<7;j++){                       // 7개의 일을 생성
            const td=document.createElement('td')   // td 생성
            tr.appendChild(td)
            if((i===0&&j<first.getDay())||cnt>pageYear[first.getMonth()]){
                // 1일 이전, 마지막날 이후 비움
            }else{
                td.textContent=cnt
                td.setAttribute('id',cnt)
                // 휴일인 경우 클래스 추가
                const currentDate=new Date(first.getFullYear(),first.getMonth(),cnt);
                
                if (isHoliday(currentDate)) {
                    td.classList.add('holiday')
                    // const holidayName = getHolidayName(currentDate);
                    // td.textContent = `${cnt} (${holidayName})`;
                }
                // 마우스 오버 및 마우스 아웃 이벤트 리스너 등록
                td.addEventListener('mouseover',handleDateMouseOver)

                cnt++
            }
        }
        monthCnt++
        calendarBody.appendChild(tr)
    }
    console.log(today)

    // 6번째 주가 빈칸일 경우 
    const lastRow = calendarBody.lastElementChild;
    const isEmptyRow = Array.from(lastRow.children).every((td) => td.textContent === '');
    if (isEmptyRow) {
      lastRow.style.display='none';
    }
}

showCalendar()

// 달력을 지움
function removeCalendar(){
    let catchTr=100
    for(let i=100;i<106;i++){
        let tr=document.getElementById(catchTr)
        tr.remove()
        catchTr++
    }
}

// 할일을 지움
function removeElements() {
    const divs=document.querySelectorAll('#input-list>div')
    divs.forEach(function(e){
        e.remove()
    })
    const btns = document.querySelectorAll('#input-list>button')
    btns.forEach(function(e1){
        e1.remove()
    })
}

// 이전 달
function prev(){
    if(pageFirst.getMonth()===1){
        pageFirst=new Date(first.getFullYear()-1,12,1)
        first=pageFirst
        if(first.getFullYear()%4===0&&first.getFullYear()%100!==0||first.getFullYear()%400===0){
            pageYear=leapYear
        }else{
            pageYear=notLeapYear
        }
    }else{
        pageFirst=new Date(first.getFullYear(), first.getMonth()-1,1)
        first=pageFirst
    }
    today=new Date(today.getFullYear(),today.getMonth()-1,today.getDate())
    updateCalendar()
    console.log(today)
}

// 다음 달
function next(){
    if(pageFirst.getMonth()===12){
        pageFirst=new Date(first.getFullYear()+1,1,1)
        first=pageFirst
        if(first.getFullYear()%4===0&&first.getFullYear()%100!==0||first.getFullYear()%400===0){
            pageYear=leapYear
        }else{
            pageYear=notLeapYear
        }
    }else{
        // if(pageFirst.getMonth()===7&&today.getDate()===31){            
        //     pageFirst=new Date(first.getFullYear(),first.getMonth()-1,1)
        // }
        pageFirst=new Date(first.getFullYear(),first.getMonth()+1,1)
        first=pageFirst
    }
    today=new Date(today.getFullYear(),today.getMonth()+1,today.getDate())
    updateCalendar()
    console.log(today)
}

// Todo List 날짜 요일 보여주기
// const mainMonth=document.querySelector('#main-month')    // 월 출력
const mainTodayDate=document.querySelector('#main-date')    // 날짜 출력
const mainTodayDay=document.querySelector('#main-day')      // 요일 출력
const mainHoliday=document.querySelector('#main-holiday')   // 휴일일때 출력

function showMain(){
    // mainMonth.innerHTML=`${today.getMonth()+1}`
    mainTodayDate.innerHTML=`${today.getDate()}`
    mainTodayDay.innerHTML=`${dayList[today.getDay()]}`
    const currentDate=new Date(today.getFullYear(),today.getMonth(),today.getDate())
    if (isHoliday(currentDate)){
        const holidayName=getHolidayName(currentDate)
        mainHoliday.innerHTML=`그리고 ${holidayName}`;
    } else {
        mainHoliday.innerHTML=''
    }
}
// 휴일명 지정
function getHolidayName(date) {
    const month=date.getMonth()
    const day=date.getDate()
    for (const holiday of holidays) {
        if (holiday.month===month&&holiday.day===day){
            return holiday.name
        }
    }
    return ""
}

// 이전,다음 클릭
let clickedDate1=document.getElementById(today.getDate())
clickedDate1.classList.add('active')
const prevBtn=document.getElementById('prev')
const nextBtn=document.getElementById('next')
prevBtn.addEventListener('click',prev)
nextBtn.addEventListener('click',next)
// clickedDate1.classList.add('today-select')

// 각 td에 클릭 이벤트 리스너를 등록
const tdGroup=[]
function clickStart(){
    for(let i=1;i<=pageYear[first.getMonth()];i++){
        tdGroup[i]=document.getElementById(i)
        tdGroup[i].addEventListener('click',changeToday)
    }
    // 현재의 month와 오늘의 month가 같으면 오늘 날짜에 today-select 클래스를 부여
    const todayElement=document.getElementById(today1.getDate())
    if(today.getMonth()===today1.getMonth()){
        todayElement.classList.add('today-select')
    }
}

// 다른 날짜 클릭
function changeToday(e) {
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
        if (tdGroup[i].classList.contains('active')) {
            tdGroup[i].classList.remove('active')
        }
    }
    clickedDate1 = e.currentTarget
    clickedDate1.classList.add('active')
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id)
    showMain()
    keyValue = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
    // console.log(today)
    // console.log(keyValue)
    updateTodolist()
}

showMain()
clickStart()

// TodoList
let list = document.getElementById('todolist') // ul
let todo = document.getElementById('item') // input
let addItemBtn = document.getElementById('addItemBtn') // 추가 버튼
addItemBtn.addEventListener('click', addItem)   // 버튼 클릭 이벤트리스너
let todoList = {} // 할일을 저장할 객체
let keyValue // 선택된 날짜의 키 값

function addItem() {
    if (todo.value.trim() !== '') {     // 입력창이 비어있지 않으면
        let listItem = document.createElement('li')     // li 생성
        let itemId = 'item-' + Date.now()   // 고유한 식별자 생성
        listItem.id = itemId
        listItem.className = 'd-flex list-group-item list-group-item-cation list-group-item-warning'
        listItem.innerText = todo.value

        // console.log(itemId)

        let xbtn = document.createElement('button')     // 삭제 버튼 생성
        xbtn.className = 'btn-close ms-auto'
        xbtn.addEventListener('click', function (e) {   // 삭제 버튼 클릭
            let pnode = e.target.parentNode
            list.removeChild(pnode)
            if (todoList[keyValue] && todoList[keyValue][itemId]) {
                delete todoList[keyValue][itemId]       // 할일 삭제
            }
            // console.log(itemId)
        })
        listItem.appendChild(xbtn)      // li에 버튼 추가
        list.appendChild(listItem)      // ul에 li 추가

        if (!todoList[keyValue]) {      // todoList 객체에 선택된 날짜의 키 값이 없다면
            todoList[keyValue] = {}     //  새로운 객체를 생성
        }

        todoList[keyValue][itemId] = {  // 새 할일을 todoList 객체에 추가
            content: todo.value,    // 할일 내용
            completed: false        // 완료 여부
        }

        todo.value = ''     // 할일 입력 필드를 비우고
        todo.focus()        // 포커스를 이동
    } else {
        alert('할일을 입력하세요.')
    }
}

// 할일 리스트 업데이트 함수
function updateTodolist(){
    // 선택된 날짜에 해당하는 할일 리스트가 있으면 보여줌
    if (todoList[keyValue]) {
        list.innerHTML = ''
        Object.keys(todoList[keyValue]).forEach(function (itemId) {
            if (!todoList[keyValue][itemId].completed) {
                createListItem(itemId, todoList[keyValue][itemId].content)
            }
        })
    } else {
        list.innerHTML = '' // 선택된 날짜에 할일이 없으면 비움
    }
}

// 새로운 할일 항목을 생성
function createListItem(itemId, content) {
    let listItem = document.createElement('li')
    listItem.id = itemId
    listItem.className = 'd-flex list-group-item list-group-item-cation list-group-item-warning'
    listItem.innerText = todoList[keyValue][itemId].content

    let xbtn = document.createElement('button')
    xbtn.className = 'btn-close ms-auto'
    xbtn.addEventListener('click', function (e) {
        let pnode = e.target.parentNode
        list.removeChild(pnode)
        delete todoList[keyValue][itemId] // 할일 삭제
    })

    listItem.appendChild(xbtn)
    list.appendChild(listItem)
}

function updateCalendar() {
    removeElements()
    removeCalendar()
    showCalendar()
    showMain()
    clickedDate1 = document.getElementById(today.getDate())
    clickedDate1.classList.add('active')
    clickStart()
    updateTodolist()
}

// 새로고침 시 저장된 할일 리스트를 복원
window.addEventListener('load',()=>{
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        updateTodolist()
    }
})
// 할일 리스트를 로컬 스토리지에 저장
window.addEventListener('beforeunload',()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList))
})

// 엔터키를 눌러서 할일 등록
todo.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addItem()
    }
})

// 이전 버튼 클릭 시 할일 리스트 복원
prevBtn.addEventListener('click',()=>{
    keyValue = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
    // console.log(todoList[keyValue])
    // console.log(keyValue)
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        updateTodolist()
    }
    updateTodolist()
})

// 다음 버튼 클릭 시 할일 리스showTodoList트 복원
nextBtn.addEventListener('click',()=>{
    keyValue = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
    // console.log(todoList[keyValue])
    // console.log(keyValue)
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        updateTodolist()
    }
    updateTodolist()
})

localStorage.removeItem('todoList')

