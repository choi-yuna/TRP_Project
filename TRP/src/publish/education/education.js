import { showEducationDetailPopup } from './educationDetailPopup.js';

document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('education-main');
    if (!main) return console.error('#education-main이 없습니다');
    renderEducationPage(main);
  });
  
  function renderEducationPage(container) {
    container.innerHTML = '';
  
    // 1) 타이틀 + 검색바
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-8';
    header.innerHTML = `<h1 class="text-2xl font-bold">교육 이수현황</h1>`;
    header.appendChild(createSearchBar());
    container.appendChild(header);
  
    // 2) 카드 영역
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'flex flex-wrap gap-6 mb-8';
    cardWrapper.appendChild(createCompletionBlock());
    cardWrapper.appendChild(createDistributionBlock());
    cardWrapper.appendChild(createRecentAlertsBlock());
    container.appendChild(cardWrapper);
  
    // 3) 표 제목
    const tableTitle = document.createElement('h2');
    tableTitle.className = 'text-2xl font-semibold mb-4 mt-4';
    tableTitle.innerText = '교육별 이수현황';
    container.appendChild(tableTitle);
  
    // 4) 테이블 + 페이징 컨테이너
    const tableSection = document.createElement('div');
    const paginationSection = document.createElement('div');
    container.appendChild(tableSection);
    container.appendChild(paginationSection);
  
    // 5) 상태 + 데이터
    const tableData = generateDummyData(53);
    const state = { filter: '', page: 1, pageSize: 10 };
  
    function renderTable() {
      // 필터링 & 페이징
      const filtered = tableData.filter(item =>
        item.name.includes(state.filter)
      );
      const totalPages = Math.ceil(filtered.length / state.pageSize);
      const start = (state.page - 1) * state.pageSize;
      const pageItems = filtered.slice(start, start + state.pageSize);
  
      // 표 렌더
      tableSection.innerHTML = '';
      const tableEl = createStatusTable(pageItems);
      tableSection.appendChild(tableEl);
  
      pageItems.forEach((item, rowIndex) => {
        const row = tableEl.querySelectorAll('tbody tr')[rowIndex];
        const nameCell = row.querySelector('td:nth-child(4)');
        nameCell.style.cursor = 'pointer';
        nameCell.addEventListener('click', () => {
          // item.no 를 넘겨서 상세데이터를 가져오고 팝업 띄우기
          const detailData = fetchEducationDetail(item.no);
          showEducationDetailPopup(detailData);
        });
      });

      tableEl.querySelectorAll('button.notify-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          showConfirmDialog(
            '미이수 알림을 발송하시겠습니까?',
            '미이수 기사님들에게 이수 재촉 \n 알림이 발송됩니다',
            () => {
              showToast(
                '미이수자 알림이 발송되었습니다',
                '최근 발송 목록에서 확인하세요'
              );
            }
          );
        });
      });
  
      // 페이징 렌더
      paginationSection.innerHTML = '';
      paginationSection.appendChild(createPagination(totalPages, state.page));
    }
  
    // 검색 이벤트
    header.querySelector('#edu-search-input')
      .addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          state.filter = e.target.value.trim();
          state.page = 1;
          renderTable();
        }
      });
    header.querySelector('#edu-search-btn')
      .addEventListener('click', () => {
        state.filter = header.querySelector('#edu-search-input').value.trim();
        state.page = 1;
        renderTable();
      });
  
    // 페이징 클릭 이벤트
    paginationSection.addEventListener('click', e => {
      if (e.target.dataset.page) {
        state.page = Number(e.target.dataset.page);
        renderTable();
      }
    });
  
    // 최초 호출
    renderTable();
  }
  
  
  
  // 이수현황 카드 (570×340)
  function createCompletionBlock() {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-10 flex flex-col h-[340px] flex-shrink-0';
    card.style.flex = '570 1 0%';
  
    // 헤더
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';
    header.innerHTML = `
      <h2 class="text-2xl font-semibold">이수현황</h2>
      <div class="text-m text-gray-500 flex items-center mr-5">
        ${new Date().toLocaleString('ko-KR')} 기준
        <button class="ml-2 text-3xl mb-1 hover:text-gray-700">⟳</button>
      </div>
    `;
    card.appendChild(header);
  
    // 도넛 차트 2개
    const flexCharts = document.createElement('div');
    flexCharts.className = 'flex items-center justify-around flex-1';
    flexCharts.appendChild(createDonutChart({
      label: '기사',
      percentage: 50,
      primaryColor: '#3B82F6',
      secondaryColor: '#E0E7FF'
    }));
    // 세로 구분선
    const separator = document.createElement('div');
    separator.className = 'w-px h-60 bg-gray-200';
    flexCharts.appendChild(separator);
    flexCharts.appendChild(createDonutChart({
      label: '관리자',
      percentage: 20,
      primaryColor: '#22C55E',
      secondaryColor: '#ECFDF3'
    }));
  
    card.appendChild(flexCharts);
    return card;
  }


// 교육 분포도 카드 (320×340)
function createDistributionBlock() {
    const total = 34, admin = 12, agent = 8;
  const adminPerc = Math.round((admin / total) * 100);
  const agentPerc = Math.round((agent / total) * 100);

  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow p-6 flex flex-col h-[340px] flex-shrink-0';
  card.style.flex = '320 1 0%';

  // 헤더
  const header = document.createElement('h2');
  header.className = 'text-2xl font-semibold mb-4';
  header.innerText = '교육 분포도';
  card.appendChild(header);

  // 상단: 도넛 차트 + 전체 정보
  const top = document.createElement('div');
  top.className = 'flex items-center flex-1 mb-4';
  card.appendChild(top);

  // primaryColor=#22C55E(관리자), secondaryColor=#3B82F6(기사)
  const donut = createDonutChart({
    label: '',
    percentage: adminPerc,
    primaryColor: '#22C55E',
    secondaryColor: '#3B82F6',
    showLegend: false,
    showLabel: false
  });
  
  top.appendChild(donut);

  // 전체 갯수 & 퍼센트
  const info = document.createElement('div');
  info.className = 'flex flex-col items-start ml-10';
  info.innerHTML = `
  <span class="font-bold text-gray-600 text-xl">전체</span>
  <span class="font-bold text-black text-2xl">${total}개</span>
    <span class="text-sm text-gray-500">(${(100).toFixed(1)}%)</span>
  `;
  top.appendChild(info);

  // 하단 범례: 관리자 / 기사
  const legend = document.createElement('div');
  legend.className = 'mt-auto flex flex-col space-y-2';
  card.appendChild(legend);

  // 관리자 행
  const adminRow = document.createElement('div');
  adminRow.className = 'flex justify-between text-sm';
  adminRow.innerHTML = `
    <span class="flex items-center">
      <span class="w-3 h-3 bg-[#22C55E] rounded-sm inline-block mr-2"></span>
      관리자 ${admin}개
    </span>
    <span>(${adminPerc}%)</span>
  `;
  legend.appendChild(adminRow);

  // 기사 행
  const agentRow = document.createElement('div');
  agentRow.className = 'flex justify-between text-sm';
  agentRow.innerHTML = `
    <span class="flex items-center">
      <span class="w-3 h-3 bg-[#3B82F6] rounded-sm inline-block mr-2"></span>
      기사 ${agent}개
    </span>
    <span>(${agentPerc}%)</span>
  `;
  legend.appendChild(agentRow);

  return card;
  }
  
  
  // 3️⃣ 최근 알림 발송한 교육 카드 (538×340)
  function createRecentAlertsBlock() {
    const data = [
      { name: '기사 입사 교육', date: '2025.07.12' },
      { name: '사내 규칙 교육', date: '2025.07.10' },
      { name: '사내 규칙 교육', date: '2025.07.10' },
      { name: '사내 규칙 교육', date: '2025.07.10' },
      { name: '사내 규칙 교육', date: '2025.07.10' },
      { name: '몰라요 교육',   date: '2025.07.05' },
    ];
  
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-10 flex flex-col h-[340px] flex-shrink-0';
    card.style.flex = '538 1 0%';
  
    // 헤더
    const header = document.createElement('h2');
    header.className = 'text-xl font-semibold mb-7';
    header.innerText = '최근 알림 발송한 교육';
    card.appendChild(header);
  
    // 리스트 영역: 테이블을 카드 하단에 붙이기
    const wrapper = document.createElement('div');
    wrapper.className = 'overflow-y-auto mt-auto';
    card.appendChild(wrapper);
  
    const table = document.createElement('table');
    table.className = 'w-full';
    table.innerHTML = `
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-4">교육명</th>
        <th class="px-6 py-4">발송 날짜</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(item => `
        <tr>
          <td class="px-6 py-4 text-center">${item.name}</td>
          <td class="px-6 py-4 text-center">${item.date}</td>
        </tr>
      `).join('')}
    `;
    wrapper.appendChild(table);
  
    return card;
  }
  
  // 도넛 차트 유틸 
  function createDonutChart({
    label = '',
    percentage = 0,
    primaryColor = '#3B82F6',
    secondaryColor = '#E0E7FF',
    showLegend = true,
    showLabel = true
  }) {
    const size = 140, thickness = 16;
    const container = document.createElement('div');
    container.className = 'relative flex flex-col items-center';
  
    // 1) 바깥 원(파이 차트)
    const donut = document.createElement('div');
    Object.assign(donut.style, {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `conic-gradient(${primaryColor} ${percentage}%, ${secondaryColor} ${percentage}% 100%)`
    });
    container.appendChild(donut);
  
    // 2) 안쪽 원(홀) — 도넛 형태를 위해 항상 추가
    const inner = document.createElement('div');
    Object.assign(inner.style, {
      width: `${size - thickness*2}px`,
      height: `${size - thickness*2}px`,
      borderRadius: '50%',
      background: '#fff',
      position: 'absolute',
      top: `${thickness}px`,
      left: `${thickness}px`
    });
    inner.className = 'flex flex-col items-center justify-center text-center';
    // 텍스트는 옵션에 따라 추가
    if (showLabel) {
      inner.innerHTML = `
        ${label ? `<span class="font-semibold">${label}</span>` : ''}
        <span class="text-lg font-bold">${percentage}%</span>
      `;
    }
    donut.appendChild(inner);
  
    // 3) legend 옵션
    if (showLegend) {
      const legend = document.createElement('div');
      legend.className = 'flex items-center mt-4 space-x-4 text-sm';
      legend.innerHTML = `
        <span class="flex items-center">
          <span class="w-3 h-3 bg-[${primaryColor}] rounded-sm inline-block mr-1"></span>이수
        </span>
        <span class="flex items-center">
          <span class="w-3 h-3 bg-[${secondaryColor}] rounded-sm inline-block mr-1"></span>미이수
        </span>
      `;
      container.appendChild(legend);
    }
  
    return container;

    container.innerHTML = '';
  
    // 상단: 타이틀 + 검색바
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-8';
    header.innerHTML = `<h1 class="text-3xl font-bold">교육 이수현황</h1>`;
    header.appendChild(createSearchBar());
    container.appendChild(header);
  
    // 카드 영역
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-wrap gap-6 mb-8';
    wrapper.appendChild(createCompletionBlock());
    wrapper.appendChild(createDistributionBlock());
    wrapper.appendChild(createRecentAlertsBlock());
    container.appendChild(wrapper);
  
    // 데이터 + 상태 저장
    const tableData = generateDummyData(53); // TODO:- 53개 더미 테스트데이터
    const state = { filter: '', page: 1, pageSize: 10 };
  
    // 테이블 + 페이징 컨테이너
    const tableSection = document.createElement('div');
    const paginationSection = document.createElement('div');
    container.appendChild(tableSection);
    container.appendChild(paginationSection);
  
    // 렌더 함수
    function renderTable() {
      const filtered = tableData.filter(item =>
        item.name.includes(state.filter)
      );
      const totalPages = Math.ceil(filtered.length / state.pageSize);
      const start = (state.page - 1) * state.pageSize;
      const pageItems = filtered.slice(start, start + state.pageSize);
  
      tableSection.innerHTML = '';
      tableSection.appendChild(createStatusTable(pageItems));
      paginationSection.innerHTML = '';
      paginationSection.appendChild(createPagination(totalPages, state.page));
    }
  
    // 검색/페이지 이벤트 바인딩
    container.querySelector('#edu-search-input').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        state.filter = e.target.value.trim();
        state.page = 1;
        renderTable();
      }
    });
    container.querySelector('#edu-search-btn').addEventListener('click', () => {
      const val = container.querySelector('#edu-search-input').value.trim();
      state.filter = val;
      state.page = 1;
      renderTable();
    });
  
    // 페이지네이션 클릭
    paginationSection.addEventListener('click', e => {
      if (e.target.dataset.page) {
        state.page = Number(e.target.dataset.page);
        renderTable();
      }
    });
  
    renderTable();
  }
  
  
  // — 검색 바
  function createSearchBar() {
    const wrap = document.createElement('div');
    wrap.className = 'flex items-center';
    wrap.innerHTML = `
      <input id="edu-search-input" 
             type="text" 
             placeholder="검색" 
             class="border rounded-l px-4 py-2 focus:outline-none" />
      <button id="edu-search-btn" 
              class="bg-white border border-l-0 rounded-r px-3 py-2 hover:bg-gray-100">
        🔍
      </button>
    `;
    return wrap;
  }
  
// — 확인 다이얼로그
function showConfirmDialog(title, message, onConfirm) {
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50';
  
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl shadow-lg p-6 w-[320px] h-[202px] text-center';
    modal.innerHTML = `
      <h3 class="text-2xl font-semibold mb-2 mt-10 m-2">${title}</h3>
      <p class="text-xl text-gray-500 mb-6  m-2">${message}</p>
      <div class="flex justify-center gap-4">
        <button id="confirm-cancel" class="px-12 py-5 text-xl rounded-lg border hover:bg-gray-100">취소</button>
        <button id="confirm-ok" class="px-12 py-5 text-xl rounded-lg bg-[var(--Primary-Normal,#4a69e4)] text-white">발송</button>
      </div>
    `;
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  
    modal.querySelector('#confirm-cancel').onclick = () => backdrop.remove();
    modal.querySelector('#confirm-ok').onclick = () => {
      backdrop.remove();
      onConfirm();
    };
  }
  
  // — 토스트 피드백
  function showToast(title, subtitle) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed top-4 right-4 flex flex-col gap-2 z-50';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'bg-gray-800 text-white rounded-lg px-10 py-5 w-[380px] h-[72px]  shadow';
    toast.innerHTML = `
    <div class="flex items-center mb-1">
      <img src="../../assets/icons/toastCheck.png" alt="check icon" class="w-6 h-6 mr-3" />
      <span class="font-semibold text-xl">${title}</span>
    </div>
    <div class="text-lg">${subtitle}</div>
  `;

    container.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
      if (container.childElementCount === 0) container.remove();
    }, 3000);
  }
  
  
  // — 상태 테이블 (발송 버튼에 notify-btn 클래스 추가)
  function createStatusTable(items) {
    const table = document.createElement('table');
    table.className = 'w-full text-center align-middle border-separate border-spacing-y-2';
    table.innerHTML = `
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-gray-500 text-center align-middle"><input type="checkbox"/></th>
          <th class="p-3 text-gray-500 text-center align-middle">번호</th>
          <th class="p-3 text-gray-500 text-center align-middle">구분</th>
          <th class="p-3 text-gray-500 text-center align-middle" style="width:30%;">교육명</th>
          <th class="p-3 text-gray-500 text-center align-middle">기간</th>
          <th class="p-3 text-gray-500 text-center align-middle">이수</th>
          <th class="p-3 text-gray-500 text-center align-middle">지연이수</th>
          <th class="p-3 text-gray-500 text-center align-middle">미이수</th>
          <th class="p-3 text-gray-500 text-center align-middle">미이수 알림 발송</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
  
    items.forEach(it => {
      const tr = document.createElement('tr');
      if (it.period !== '진행') tr.className = 'bg-gray-50 text-gray-400';
  
      tr.innerHTML = `
        <td class="p-3"><input type="checkbox"/></td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.no}</td>
        <td class="p-3">
          <span class="${getCategoryClasses(it.category)} px-2 py-1 rounded text-sm">
            ${it.category}
          </span>
        </td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.name}</td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.period}</td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.completed}</td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.late}</td>
        <td class="p-3 ${it.period==='진행'?'font-bold':''}">${it.notCompleted}</td>
        <td class="p-3">
          ${
            it.period === '진행'
              ? `<button class="notify-btn text-blue-600 hover:underline">발송하기 ›</button>`
              : `<button disabled class="text-gray-400">발송하기 ›</button>`
          }
        </td>
      `;
      tbody.appendChild(tr);
    });
  
    return table;
  }
  
  /* — 페이징 */
  function createPagination(totalPages, current) {
    const nav = document.createElement('div');
    nav.className = 'flex justify-center items-center mt-4 space-x-3 text-m';
    const makeBtn = (label, pg, disabled, active) => {
      const b = document.createElement('button');
      b.innerText = label;
      b.disabled = disabled;
      b.dataset.page = pg;
      b.className = active
        ? 'font-bold text-blue-600'
        : disabled
          ? 'text-gray-400'
          : 'hover:underline';
      return b;
    };
    nav.appendChild(makeBtn('<',  current-1, current===1,   false));
    for (let p=1; p<=totalPages; p++) {
      nav.appendChild(makeBtn(p, p, false, p===current));
    }
    nav.appendChild(makeBtn('>', totalPages===current?current:current+1, current===totalPages, false));
    return nav;
  }
  
  /* — 카테고리 태그 */
  function getCategoryClasses(cat) {
    switch(cat) {
      case '전체':   return 'bg-red-100 text-red-600';
      case '관리자': return 'bg-green-100 text-green-600';
      case '기사':   return 'bg-blue-100 text-blue-600';
      default:       return '';
    }
  }
  
  /* — 더미 생성 (period 번갈아 진행/만료) */
  function generateDummyData(count) {
    const cats = ['전체','관리자','기사'];
    const periods = ['진행','만료'];
    return Array.from({length: count}, (_, i) => ({
      no: i+1,
      category: cats[i % cats.length],
      name: `교육과정 ${i+1}번`,
      period: periods[i % periods.length],
      completed: Math.floor(Math.random()*100),
      late:      Math.floor(Math.random()*100),
      notCompleted: Math.floor(Math.random()*100),
    }));
  }
  

function fetchEducationDetail(id) {
  return {
    id,
    title: `교육과정 ${id} 상세`,
    instructorName: '홍길동',
    date: '2025.07.20',
    description: '이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…이 교육은 성희롱 예방 등을 다루며…',
    requiredDate: '2025.08.01',
    attachments: [
      { name: '자료.pdf', type: 'pdf', size: '2.3MB', url: '/files/1.pdf' },
      { name: '슬라이드.pptx', type: 'pptx', size: '1.1MB', url: '/files/2.pptx' },
    ],
    stats: { total: 100, completed: 45, notCompleted: 34, late: 23 },
    participants: Array.from({ length: 100 }, (_, i) => ({
      name: `참여자 ${i+1}`,
      status: ['completed','notCompleted','late'][i % 3],
      statusText: ['이수','미이수','지연이수'][i % 3],
      requiredDate: '2025.08.01',
      actualDate: i % 3 === 0 ? '2025.07.30' : '',
    }))
  };
}
