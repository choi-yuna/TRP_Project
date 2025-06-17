const weekdayRow = document.getElementById('weekdayRow');
const hourRow = document.getElementById('hourRow');
const tbody = document.getElementById('scheduleBody');

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
const today = new Date();
const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

// 1행: 요일 + 날짜 (colSpan 합 25 맞춤)
const thName = document.createElement('th');
thName.className = 'border w-24 p-10';
thName.rowSpan = 1;
thName.textContent = ' ';
weekdayRow.appendChild(thName);

const colSpans = [4,4,4,4,3,3,3]; // 합 = 25

weekDays.forEach((day, i) => {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + i);

  const th = document.createElement('th');
  th.className = 'border g-20 text-sm ';
  th.colSpan = colSpans[i];
  th.innerHTML = `${day}<br class="g-20">${date.getDate()}`;
  weekdayRow.appendChild(th);
});

// 2행: 이름 + 시간
const thHourName = document.createElement('th');
thHourName.className = 'border text-xs bg-[#FAFAFA] text-[#929292] w-24';
thHourName.textContent = '이름';
hourRow.appendChild(thHourName);

for (let i = 0; i <= 24; i++) {
  const th = document.createElement('th');
  th.className = 'border text-xs w-[calc(100%/25)] h-8 bg-[#FAFAFA] text-[#929292]';
  th.textContent = i;
  hourRow.appendChild(th);
}

// 데이터
const names = ['김예나','이주성','이주성','오준희','유수현','신태환','최시온','최윤아'];
names.forEach(name => {
  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.className = 'border px-1 py-3 align-top justify-center w-24';
  tdName.innerHTML = `
    <div mt-1>${name}</div>
    <div class="text-xs text-gray-500">운전원</div>
    <div class="text-xs ml-6 mt-1  text-blue-500 bg-blue-100 rounded-full w-8 text-center">8h</div>
  `;
  tr.appendChild(tdName);

  for (let i = 0; i <= 24; i++) {
    const td = document.createElement('td');
    td.className = 'border p-0 relative h-0 ';

    if (i === 8) {
      const bar = document.createElement('div');
      bar.className = 'absolute top-0 left-0 mt-4 py-3 bg-[#EEF1FF] flex justify-between items-centerpx-1';
      bar.style.width = `${(16 - 8 + 1) * 100}%`; 
      bar.innerHTML = `
        <span class="text-[#2D3F8A] px-5 text-xs">8시</span>
        <span class="bg-white text-[#2D3F8A] rounded-xl px-5 w-20 h-7 flex justify-center  items-center text-xs">480분</span>
        <span class="text-[#2D3F8A]  px-5 text-xs">16시</span>
      `;
      td.appendChild(bar);
    }

    tr.appendChild(td);
  }

  tbody.appendChild(tr);
});
