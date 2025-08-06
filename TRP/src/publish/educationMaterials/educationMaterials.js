import { showMaterialsPopup } from './educationMaterialsPopup.js';

// 예시 데이터
let materialsData = [
  { id: 1, title: '안전 교육', period: '2023.01.01~2023.03.31', completed: 20, delayed: 2, notCompleted: 1, status: 'in-progress' },
  { id: 2, title: '품질 관리', period: '2022.01.01~2022.06.30', completed: 30, delayed: 0, notCompleted: 5, status: 'expired' },
  { id: 3, title: '기술 동향', period: '2024.04.01~2024.06.30', completed: 15, delayed: 1, notCompleted: 0, status: 'in-progress' },
  // 추가 데이터...
];
const rowsPerPage = 10;
let currentPage = 1;

  
  function initMaterialsPage() {
    const container = document.getElementById('materials-page');
    container.classList.add('bg-white', 'min-h-screen', 'px-6', 'py-8');
    container.innerHTML = `
    <div class="w-full px-6 flex justify-between items-center mb-4">
        <h1 class="text-3xl font-semibold">일반 교육자료</h1>
        <div class="flex items-center justify-end space-x-4">
    <!-- 검색창 -->
    <div class="relative">
      <input
        type="text"
        placeholder="검색"
        class="h-10 pl-10 pr-12 rounded-full bg-gray-100 focus:outline-none"
      />
      <button class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <img src="../../assets/icons/search.png" alt="검색" class="w-5 h-5"/>
      </button>
    </div>
    <!-- 업로드 버튼 -->
    <button class="flex items-center space-x-1 bg-[#FFFFFF] text-[#323542] border-[#AAACB4] border-2 px-5 py-2 rounded-xl">
      <span>엑셀 업로드</span>
      <img src="../../assets/icons/upload.png" alt="엑셀 업로드" class="w-4 h-4"/>
    </button>
    <!-- 다운로드 버튼 -->
    <button class="flex items-center space-x-1 bg-[#474B5D] text-white px-4 py-2 rounded-xl">
      <span>엑셀 다운로드</span>
      <img src="../../assets/icons/download2.png" alt="엑셀 다운로드" class="w-4 h-4"/>
    </button>
  </div>
      </div>
      
      <hr class="border-gray-200 mb-4" />
      <div id="materials-table-container"></div>
      <div id="materials-pagination" class="flex justify-center mt-4"></div>
      <div id="action-wrapper" class="fixed bottom-6 right-6 flex space-x-2"></div>
    `;
  

    document
      .getElementById('materials-search-container')
  
    renderMaterialsTable();
    renderPagination();
    resetActions();
  }
function renderMaterialsTable() {
  const container = document.getElementById('materials-table-container');
  container.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'w-full border-collapse text-center';
  table.innerHTML = `
    <thead class="bg-gray-100 text-[#929292]">
      <tr>
        <th class="p-2"><input id="select-all" type="checkbox" /></th>
        <th class="p-2">번호</th>
        <th class="p-2 w-1/3 text-center">교육명</th>
        <th class="p-2">기간 상태</th>
        <th class="p-2">이수</th>
        <th class="p-2">지연이수</th>
        <th class="p-2">미이수</th>
        <th class="p-2">미이수 알림 발송</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  const start = (currentPage - 1) * rowsPerPage;
  const pageData = materialsData.slice(start, start + rowsPerPage);

  pageData.forEach((item, idx) => {
    const isActive = item.status === 'in-progress';
    const statusText = isActive ? '진행' : '만료';
    const textClass = isActive
      ? 'text-gray-900 font-semibold'
      : 'text-gray-400';

    const tr = document.createElement('tr');
    tr.className = `${textClass} hover:bg-gray-50`;
    tr.innerHTML = `
      <td class="p-2"><input type="checkbox" data-id="${item.id}" /></td>
      <td class="p-2">${start + idx + 1}</td>
      <td class="p-2 text-center">${item.title}</td>
      <td class="p-2">${statusText}</td>
      <td class="p-2">${item.completed}</td>
      <td class="p-2">${item.delayed}</td>
      <td class="p-2">${item.notCompleted}</td>
      <td class="p-2">
      ${
                 isActive
                   ? `<button class="notify-btn text-blue-600 hover:underline">발송하기 ›</button>`
                   : `<button disabled class="text-gray-400">발송하기 ›</button>`
               }
      </td>
    `;
    tbody.appendChild(tr);
  });

  container.appendChild(table);
  bindTableCheckboxes(); // 체크박스 이벤트 바인딩
}

function renderPagination() {
  const pagination = document.getElementById('materials-pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(materialsData.length / rowsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.className = [
      'w-8 h-8 flex items-center justify-center',
      'mx-1',
      i === currentPage
        ? 'bg-blue-500 text-white rounded-full'
        : 'text-gray-600 hover:bg-gray-200 rounded-full'
    ].join(' ');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderMaterialsTable();
      renderPagination();
    });
    pagination.appendChild(btn);
  }
}

function resetActions() {
  const wrapper = document.getElementById('action-wrapper');
  wrapper.innerHTML = '';
  const addBtn = document.createElement('button');
  addBtn.id = 'add-material-btn';
  addBtn.innerText = '+ 자료 등록';
  addBtn.className = 'bg-gray-700 text-white rounded-full w-36 h-12 flex items-center justify-center text-xl shadow-lg';
  addBtn.addEventListener('click', () => showMaterialsPopup(materialsData));
  wrapper.appendChild(addBtn);
}

function bindTableCheckboxes() {
  const wrapper = document.getElementById('action-wrapper');
  const selectAll = document.querySelector('#select-all');
  const checkboxSelector = '#materials-table-container tbody input[type="checkbox"]';

  function updateActions() {
    const checkboxes = Array.from(document.querySelectorAll(checkboxSelector));
    const anyChecked = checkboxes.some(ch => ch.checked);
    if (anyChecked) {
      // 취소, 삭제 버튼으로 교체
      wrapper.innerHTML = '';
      const cancelBtn = document.createElement('button');
      cancelBtn.id = 'cancel-btn';
      cancelBtn.innerText = '취소';
      cancelBtn.className = 'bg-gray-300 text-gray-700 rounded-xl w-36 h-12 flex items-center justify-center text-xl shadow-lg';
      const deleteBtn = document.createElement('button');
      deleteBtn.id = 'delete-btn';
      deleteBtn.innerText = '삭제';
      deleteBtn.className = 'bg-[#4A69E4] text-white rounded-xl w-36 h-12 flex items-center justify-center text-xl shadow-lg';

      cancelBtn.addEventListener('click', () => {
        checkboxes.forEach(ch => ch.checked = false);
        selectAll.checked = false;
        resetActions();
      });
      deleteBtn.addEventListener('click', () => {
        const selectedIds = checkboxes.filter(ch => ch.checked).map(ch => Number(ch.dataset.id));
        materialsData = materialsData.filter(m => !selectedIds.includes(m.id));
        currentPage = 1;
        renderMaterialsTable();
        renderPagination();
        resetActions();
      });

      wrapper.append(cancelBtn, deleteBtn);
    } else {
      resetActions();
    }
  }

  // 전체 선택
  selectAll.addEventListener('change', () => {
    const checked = selectAll.checked;
    document.querySelectorAll(checkboxSelector).forEach(ch => ch.checked = checked);
    updateActions();
  });

  // 개별 체크박스
  document.querySelectorAll(checkboxSelector).forEach(ch => {
    ch.addEventListener('change', updateActions);
  });
}

window.addEventListener('DOMContentLoaded', initMaterialsPage);
