const weekdayRow = document.getElementById('weekdayRow');
const hourRow = document.getElementById('hourRow');
const tbody = document.getElementById('scheduleBody');
const calendarPopup = document.getElementById('calendarPopup');


weekdayRow.innerHTML = '';
hourRow.innerHTML = '';


// 이름 칸
const nameTh = document.createElement('th');
nameTh.className = 'border w-24 bg-[#f0f0f0] ';
nameTh.textContent = '이름';
hourRow.appendChild(nameTh.cloneNode(true));

// 요일 + 날짜
const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
const today = new Date();
const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

for (let i = 0; i < 7; i++) {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + i);

  const th = document.createElement('th');
  th.className = 'border w-[calc((100%-24px)/7)] text-center cursor-pointer py-3';
  th.innerHTML = `
    <div>${weekDays[i]}</div>
    <div class="relative">
      <span class="date-num inline-block rounded-full w-6 h-6 leading-6">${date.getDate()}</span>
    </div>
  `;

  th.addEventListener('click', () => {
    weekdayRow.querySelectorAll('.selected-day').forEach(el => el.classList.remove('selected-day'));
    th.classList.add('selected-day');
  });

  weekdayRow.appendChild(th);
}

// 시간 0~24
for (let i = 0; i <= 24; i++) {
  const th = document.createElement('th');
  th.className = 'border text-xs py-2 bg-[#f0f0f0] text-[#929292]';
  th.textContent = i;
  hourRow.appendChild(th);
}

//달력 팝업
calendarPopup.id = 'calendarPopup';
calendarPopup.className = 'absolute bg-white border rounded shadow-lg p-4 z-50 hidden';
document.body.appendChild(calendarPopup);

document.getElementById('calendarToggleBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleCalendarPopup(e.target);
});

function toggleCalendarPopup(target) {
  if (calendarPopup.classList.contains('hidden')) {
    renderCalendar(new Date());
    const rect = target.getBoundingClientRect();
    calendarPopup.style.top = `${rect.bottom + window.scrollY}px`;
    calendarPopup.style.left = `${rect.left + window.scrollX}px`;
    calendarPopup.classList.remove('hidden');
  } else {
    calendarPopup.classList.add('hidden');
  }
}

function renderCalendar(baseDate) {
  calendarPopup.innerHTML = '';

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth(); // 0-based

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  let html = `<div class="font-bold mb-2">${year}.${month + 1}</div>`;
  html += `<table class="text-xs"><thead><tr>`;
  ['일','월','화','수','목','금','토'].forEach(d => html += `<th class="p-1">${d}</th>`);
  html += `</tr></thead><tbody><tr>`;

  let dayOfWeek = firstDay.getDay();
  for (let i = 0; i < dayOfWeek; i++) html += `<td></td>`;

  for (let d = 1; d <= lastDay.getDate(); d++) {
    if ((dayOfWeek + d - 1) % 7 === 0 && d !== 1) html += `</tr><tr>`;
    html += `<td class="p-1 cursor-pointer hover:bg-blue-100 rounded" data-date="${d}">${d}</td>`;
  }

  html += `</tr></tbody></table>`;
  calendarPopup.innerHTML = html;

  calendarPopup.querySelectorAll('td[data-date]').forEach(td => {
    td.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedDate = parseInt(td.dataset.date);
      highlightWeek(new Date(year, month, selectedDate));
      calendarPopup.classList.add('hidden');
    });
  });
}

function highlightWeek(selectedDate) {
  const start = new Date(selectedDate);
  start.setDate(selectedDate.getDate() - selectedDate.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  alert(`선택한 주: ${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`);
  // 여기서 요일 줄, currentWeek 값 등 갱신 가능
}

// 외부 클릭 시 달력 팝업 닫기
document.addEventListener('click', (e) => {
  if (!calendarPopup.contains(e.target) && !e.target.closest('#calendarToggleBtn')) {
    calendarPopup.classList.add('hidden');
  }
});


//운전원 데이터 팝업 (테스트 더미데이터)
const drivers = [
  {
    name: "김예나",
    position: "운전원",
    birth: "1967.08.09",
    phone: "010-8989-3737",
    joinDate: "2024.08.03",
    workHour: 8,
    startHour: 8,
    endHour: 16
  },
  {
    name: "이주성",
    position: "운전원",
    birth: "1975.11.02",
    phone: "010-1111-2222",
    joinDate: "2022.03.15",
    workHour: 6,
    startHour: 10,
    endHour: 16
  },
  {
    name: "박서준",
    position: "운전원",
    birth: "1980.05.20",
    phone: "010-3333-4444",
    joinDate: "2021.07.11",
    workHour: 9,
    startHour: 7,
    endHour: 16
  },
  {
    name: "최민호",
    position: "운전원",
    birth: "1978.12.01",
    phone: "010-5555-6666",
    joinDate: "2020.02.20",
    workHour: 7,
    startHour: 9,
    endHour: 16
  },
  {
    name: "최시온",
    position: "운전원",
    birth: "1985.04.15",
    phone: "010-7777-8888",
    joinDate: "2019.05.05",
    workHour: 5,
    startHour: 11,
    endHour: 16
  },
  {
    name: "신태환",
    position: "운전원",
    birth: "1979.10.10",
    phone: "010-9999-0000",
    joinDate: "2018.08.25",
    workHour: 8,
    startHour: 6,
    endHour: 14
  },
  {
    name: "오준희",
    position: "운전원",
    birth: "1990.01.01",
    phone: "010-1111-3333",
    joinDate: "2017.09.14",
    workHour: 4,
    startHour: 14,
    endHour: 18
  },
];


tbody.innerHTML = '';
tbody.innerHTML = '';

drivers.forEach(driver => {
  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.className = 'border px-1 py-3 align-top justify-center w-24 relative items-center';

  tdName.innerHTML = `
  <div class="flex flex-col justify-center items-center">
  <div>${driver.name}</div>
  <div class="text-xs text-gray-500">${driver.position}</div>
  <div class="text-xs  mt-1 text-white bg-[#4a69e4] rounded-full w-12 py-1 text-center">${driver.workHour}h</div>
  </div>
  `;
//text-center justify-center text-white text-xs font-normal font-['Spoqa_Han_Sans_Neo'] leading-none tracking-tight
  const popup = document.createElement('div');
  popup.className = 'absolute top-full left-0 mt-2 hidden w-72 h-40 bg-white text-black rounded-xl shadow-lg p-4 z-10';
  popup.innerHTML = `
  <div class="w-full bg-[#F0F0F0] rounded-t-lg px-3 py-2 flex gap-4 justify-start items-center">
    <div class="font-bold text-black">${driver.name}</div>
    <div class="text-sm text-gray-600">${driver.position}</div>
  </div>
  <div class="p-3">
    <div class="text-sm mb-1">
      <span class="text-[#929292] mr-3">생년월일</span> 
      <span class="text-gray-700">${driver.birth}</span>
    </div>
    <div class="text-sm mb-1">
      <span class="text-[#929292] mr-3">전화번호</span> 
      <span class="text-gray-700">${driver.phone}</span>
    </div>
    <div class="text-sm">
      <span class="text-[#929292] mr-6">입사일</span> 
      <span class="text-gray-700">${driver.joinDate}</span>
    </div>
  </div>
`;

  tdName.appendChild(popup);

  tdName.addEventListener('mouseenter', () => popup.classList.remove('hidden'));
  tdName.addEventListener('mouseleave', () => popup.classList.add('hidden'));

  tr.appendChild(tdName);

  for (let i = 0; i <= 24; i++) {
    const td = document.createElement('td');
    td.className = 'border p-0 relative h-0';

    if (i === driver.startHour) {
      const bar = document.createElement('div');
      bar.className = 'absolute top-0 left-0 mt-4 py-3 bg-[#EEF1FF] flex justify-between items-center';
      bar.style.width = `${(driver.endHour - driver.startHour) * 100}%`;
      bar.innerHTML = `
        <span class="text-[#2D3F8A] px-2 text-xs">${driver.startHour}시</span>
        <span class="bg-white text-[#2D3F8A] rounded-xl px-2 w-20 h-7 flex justify-center items-center text-xs">${driver.workHour * 60}분</span>
        <span class="text-[#2D3F8A] px-2 text-xs">${driver.endHour}시</span>
      `;
      td.appendChild(bar);
    }

    tr.appendChild(td);
  }

  tbody.appendChild(tr);
});


const menuData = [
  { icon: "../../../assets/attendanceManagement/schedule.png", label: "일정" },
  { icon: "../../../assets/attendanceManagement/notice.png", label: "공지사항" },
  { icon: "../../../assets/attendanceManagement/dispatch.png", label: "배차관리" },
  { icon: "../../../assets/attendanceManagement/hr.png", label: "인사관리" },
  { icon: "../../../assets/attendanceManagement/doc.png", label: "매출관리" },
  { icon: "../../../assets/attendanceManagement/vehicle.png", label: "차량관리" },
  { icon: "../../../assets/attendanceManagement/doc.png", label: "서류관리" },
  { icon: "../../../assets/attendanceManagement/notice.png", label: "민원관리" },
  { icon: "../../../assets/attendanceManagement/schedule.png", label: "거래처관리" },
  { icon: "../../../assets/attendanceManagement/schedule.png", label: "항목관리" }
];


//사이드 바
const menuContainer = document.getElementById("sidebar-menu");

menuData.forEach(menu => {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center px-4 py-2 hover:bg-blue-800 cursor-pointer";

  li.innerHTML = `
    <div class="flex items-center gap-2">
      <img src="${menu.icon}" alt="${menu.label}" class="w-4 h-4" />
      <span>${menu.label}</span>
    </div>
    <img src="../../../assets/attendanceManagement/dropdown.png" alt="펼치기" class="w-3 h-3" />
  `;

  li.addEventListener("click", () => {
    console.log(`${menu.label} 메뉴 클릭됨`);
    // 필요한 동작 추가
  });

  menuContainer.appendChild(li);
});



