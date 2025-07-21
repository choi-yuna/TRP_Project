// educationDetailPopup.js
// Usage:
// import { showEducationDetailPopup } from './educationDetailPopup.js';
// showEducationDetailPopup(educationData);

export function showEducationDetailPopup(educationData) {
    const {
      id,
      title,
      instructorName,
      date,
      description,
      requiredDate,
      attachments,
      stats,
      participants,
    } = educationData;
  
    // 백드롭
    const backdrop = document.createElement('div');
    backdrop.id = 'edu-detail-backdrop';
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50';
  
    // 모달 컨테이너
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl shadow-lg w-[80vw] max-w-[1200px] max-h-[80vh] overflow-auto relative';
  
    // 상단 바
        const topBar = document.createElement('div');
        topBar.className = 'bg-gray-100 text-2xl text-black flex items-center px-6 h-20 rounded-t-xl';
        topBar.innerText = '교육 상세';
        modal.appendChild(topBar);
    
        // 탑바 바로 아래 가로 구분선
       const topDivider = document.createElement('hr');
        topDivider.className = 'm-0 w-full border-t border-gray-200';
        modal.appendChild(topDivider);
        
    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700 ';
    closeBtn.addEventListener('click', () => backdrop.remove());
    modal.appendChild(closeBtn);
  
  

  
    // 그리드 영역 시작 (상단 바로 아래)
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-3 gap-6 px-6';
  
    // 좌측 컬럼: 설명, 필수일, 파일, 수정 버튼
    const left = document.createElement('div');
    left.className = 'col-span-1 relative space-y-4 pr-6 border-r border-gray-200';


    

      // 제목 및 메타정보
      const titleRow = document.createElement('div');
      titleRow.className = 'flex h-19 justify-between items-center mt-3';
      titleRow.innerHTML = `
        <h2 class="text-xl font-semibold">${title}</h2>
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <div class="flex items-center space-x-1">
            <img src="../../assets/icons/person.png" class="w-4 h-4" alt="person" />
            <span>${instructorName}</span>
          </div>
          <div class="flex items-center space-x-1">
            <img src="../../assets/icons/calendar.png" class="w-4 h-4" alt="calendar" />
            <span>${date}</span>
          </div>
        </div>
      `;
      left.appendChild(titleRow);

      const descDividerTop = document.createElement('hr');
      descDividerTop.className = 'w-full border-t border-gray-200 my-4';
      left.appendChild(descDividerTop);

    //교육설명
    const desc = document.createElement('div');
    desc.className = 'flex text-gray-700 h-30 p-2';
    desc.innerText = description;
    left.appendChild(desc);

    // 교육 설명 아래 구분선
    const descDividerBottom = document.createElement('hr');
    descDividerBottom.className = 'w-full border-t border-gray-200 my-4';
    left.appendChild(descDividerBottom);
  
    const req = document.createElement('div');
    req.className = 'flex justify-between items-center text-lg my-2';
    req.innerHTML = `
      <div class="flex items-center space-x-1 text-lg text-[#515151]">
        <img src="../../assets/icons/calendar.png" class="w-5 h-5" alt="calendar" />
        <span>필수 이수일</span>
      </div>
      <span>${requiredDate}</span>
    `;
    left.appendChild(req);
  
    const attachWrap = document.createElement('div');
    attachWrap.className = 'space-y-2 mt-2';
    attachments.forEach(att => {
      const box = document.createElement('div');
      box.className = 'flex items-center m-3 h-20 mt-10 border rounded-xl p-3 gap-1 bg-[#FAFAFA]';
      box.innerHTML = `
        <img src="icons/file-${att.type}.png" class="w-6 h-6 mr-2" alt="${att.type}" />
        <div class="flex-1">
          <div class="font-medium">${att.name}</div>
          <div class="text-xs text-gray-500">${att.size}</div>
        </div>
        <button class="px-4 py-1 border border-[#4A69E4] rounded-xl bg-[#FFFFFF] text-[#4A69E4] text-xs hover:bg-gray-200" onclick="window.open('${att.url}', '_blank')">
          미리보기
        </button>
      `;
      attachWrap.appendChild(box);
    });
    left.appendChild(attachWrap);
  
    const editBtn = document.createElement('button');
    editBtn.innerText = '수정';
    editBtn.className = 'absolute bottom-4 right-4 px-8 py-3 bg-[#4A69E4] text-white rounded-lg';
    editBtn.addEventListener('click', () => window.location.href = `/education/edit/${id}`);
    left.appendChild(editBtn);
  
    grid.appendChild(left);
  
    // 우측 컬럼: 탭, 검색바 제거 (없음), 테이블, 칩, 버튼
    const right = document.createElement('div');
    right.className = 'col-span-2 flex flex-col space-y-4';
  
    const tabs = document.createElement('div');
    tabs.className = 'flex space-x-4 border-b pb-2 h-20';
    const statMap = {
      '전체': stats.total,
      '이수': stats.completed,
      '미이수': stats.notCompleted,
      '지연이수': stats.late
    };
    Object.entries(statMap).forEach(([key, count], idx) => {
      const tab = document.createElement('button');
      tab.className = 'relative text-lg text-[#929292]';
      tab.innerText = `${key} ${count}`;
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('button').forEach(b => b.classList.remove('font-semibold'));
        tab.classList.add('font-semibold');
        tabs.querySelectorAll('span.underline').forEach(el => el.remove());
        tab.insertAdjacentHTML('beforeend', '<span class="absolute bottom-0 left-0 w-full h-1 bg-blue-600 underline"></span>');
        infoLabel.innerText = `${key} ${count}`;
        const statusKey = key === '전체' ? null : (key === '이수' ? 'completed' : key === '미이수' ? 'notCompleted' : 'late');
        const filtered = statusKey ? participants.filter(p => p.status === statusKey) : participants;
        renderDetailTable(filtered, tblContainer, chipsInner);
      });
      if (idx === 0) {
        tab.classList.add('font-semibold');
        tab.insertAdjacentHTML('beforeend', '<span class="absolute bottom-0 left-0 w-full h-1 bg-blue-600 underline"></span>');
      }
      tabs.appendChild(tab);
    });

    right.appendChild(tabs);
    // 선택된 탭 정보 레이블
    const infoLabel = document.createElement('div');
    infoLabel.className = 'text-sm text-[#929292] text-gray-600 px-6';
    infoLabel.innerText = `전체 ${stats.total}`;
    right.appendChild(infoLabel);
  
    const tblContainer = document.createElement('div');
    tblContainer.className = 'overflow-auto max-h-[50vh]';
    right.appendChild(tblContainer);
  
    const chipsContainer = document.createElement('div');
    chipsContainer.className = 'w-full overflow-x-auto overflow-y-hidden';
    const chipsInner = document.createElement('div');
    chipsInner.className = 'flex items-center space-x-2 flex-nowrap whitespace-nowrap';
    chipsContainer.appendChild(chipsInner);
    const sendBtn = document.createElement('button');
    sendBtn.innerText = '알림 발송';
    sendBtn.className = 'mb-4 ml-3 w-24 h-8 bg-gray-700 text-white rounded-full';
    // 칩과 버튼을 같은 행에 배치
    const actionRow = document.createElement('div');
    actionRow.className = 'flex justify-between items-center px-6';
    actionRow.appendChild(chipsContainer);
    actionRow.appendChild(sendBtn);
    right.appendChild(actionRow);
  
    grid.appendChild(right);
    modal.appendChild(grid);
  
    // 초기 테이블 렌더
    renderDetailTable(participants, tblContainer, chipsInner);
  
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  }
  
  function renderDetailTable(data, container, chipsContainer) {
    container.innerHTML = '';
    if (chipsContainer) chipsContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'w-full text-left border-collapse';
    table.innerHTML = `
      <thead class="bg-gray-100  text-[#929292] sticky top-0">
        <tr>
          <th class="p-2"><input id="select-all" type="checkbox"/></th>
          <th class="p-2">이름</th>
          <th class="p-2">이수상태</th>
          <th class="p-2">필수 이수일</th>
          <th class="p-2">실제 이수일</th>
        </tr>
      </thead>
    `;
    const tbody = document.createElement('tbody');
    data.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = 'border-y hover:bg-gray-50 text-[#515151]';
      tr.innerHTML = `
        <td class="p-2"><input class="row-checkbox" type="checkbox" data-name="${p.name}"/></td>
        <td class="p-2">${p.name}</td>
        <td class="p-2"><span class="px-2 py-1 rounded-full text-xs ${
          p.status === 'completed' ? 'bg-blue-100 text-blue-600' :
          p.status === 'notCompleted' ? 'bg-red-100 text-red-600' :
          'bg-green-100 text-green-600'}">${p.statusText}</span></td>
        <td class="p-2">${p.requiredDate}</td>
        <td class="p-2">${p.actualDate || '-'}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
    if (chipsContainer) {
      const selectAll = container.querySelector('#select-all');
      const checkboxes = container.querySelectorAll('.row-checkbox');
      function updateChips() {
        chipsContainer.innerHTML = '';
        checkboxes.forEach(cb => {
          if (cb.checked) {
            const name = cb.dataset.name;
            const chip = document.createElement('div');
            chip.className = 'flex items-center h-8 px-4 bg-gray-200 rounded-full text-sm whitespace-nowrap';
            chip.innerHTML = `${name} <span class="ml-2 cursor-pointer">&times;</span>`;
            chip.querySelector('span').addEventListener('click', () => {
              cb.checked = false;
              updateChips();
            });
            chipsContainer.appendChild(chip);
          }
        });
      }
      checkboxes.forEach(cb => cb.addEventListener('change', updateChips));
      selectAll.addEventListener('change', () => {
        checkboxes.forEach(cb => cb.checked = selectAll.checked);
        updateChips();
      });
    }
  }
  