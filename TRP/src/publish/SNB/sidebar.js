const menuItems = [
    { 
      id: 'home', label: '홈', icon: '../../assets/icons/home.png',
      submenu: [
        { type: 'title', label: '홈' },
        { type: 'desc', label: '홈 페이지 (정책 대기중입니다.)' },
        { type: 'button', label: '대시보드', url: '/dashboard.html' },
        { type: 'button', label: '통계', url: '/home.html' }
      ]
    },
    { 
      id: 'schedule', label: '일정', icon: '../../assets/icons/schedule.png',
      submenu: [
        { type: 'title', label: '일정' },
        { type: 'desc', label: '업무현황' },
        { type: 'button', label: '달력' },
        { type: 'button', label: '칸반' }
      ]
    },
    { 
      id: 'notice', label: '공지', icon: '../../assets/icons/notify.png',
      submenu: [
        { type: 'title', label: '공지' },
        { type: 'desc', label: '공지사항' },
        { type: 'button', label: '기사공지' },
        { type: 'button', label: '사무공지' },
        { type: 'desc', label: '수칙관리' },
        { type: 'button', label: '수칙' },
      ]
    },
    { 
      id: 'office', label: '사무', icon: '../../assets/icons/officeWork.png',
      submenu: [
        { type: 'title', label: '사무' },
        { type: 'desc', label: '업무관리' },
        { type: 'button', label: '업무 결재' },
        { type: 'button', label: '일반 업무' },
        { type: 'button', label: '고정 업무' },
        { type: 'button', label: '인수인계' },
        { type: 'desc', label: '민원관리' },
        { type: 'button', label: '상담 신청' },
        { type: 'button', label: '차량 정비 신청' },
        { type: 'desc', label: '서류관리' },
        { type: 'button', label: '회사 서류' },
        { type: 'button', label: '운행 서류' },
        { type: 'desc', label: '결재관리' },
        { type: 'button', label: '결재' },
      ]
    },
    { id: 'car', label: '차량', icon: '../../assets/icons/Vehicle.png', submenu: [
        { type: 'title', label: '차량' },
        { type: 'desc', label: '차량관리' },
        { type: 'button', label: '대당효율' },
        { type: 'button', label: '차량현황' },
        { type: 'button', label: '차량등록' },
        { type: 'button', label: '점검일지' },
        { type: 'button', label: '주유관리' },
        { type: 'desc', label: '정비' },
        { type: 'button', label: '정비 그래프' },
        { type: 'button', label: '정비내역' },
        { type: 'button', label: '부품관리' },
    ] },
    { id: 'drive', label: '운행', icon: '../../assets/icons/Operation.png', submenu: [
        { type: 'title', label: '운행' },
        { type: 'desc', label: '운행관리' },
        { type: 'button', label: '실시간 관제' },
        { type: 'button', label: '운행 효율' },
        { type: 'button', label: '점호 관리' },
        { type: 'button', label: '스케줄 관리' },
        { type: 'button', label: '운행일보' },
        { type: 'button', label: '운행/배차확인' },
        { type: 'button', label: '사고관리' },
        { type: 'desc', label: '노션관리' },
        { type: 'button', label: '정류장 관리' },
        { type: 'button', label: '출퇴근 노션관리' },
        { type: 'button', label: '팀 노션관리' },
        { type: 'button', label: '노션시간표' },
        { type: 'button', label: '출퇴근 노선숙지' },
        { type: 'desc', label: '반자동' },
        { type: 'button', label: '노션 그룹' },
        { type: 'button', label: '제로공차' },
        { type: 'button', label: '노선 그룹 배차' },
        { type: 'desc', label: '배차관리' },
        { type: 'button', label: '일반배차' },
        { type: 'button', label: '출퇴근 배차' },
    ] },
    { id: 'hr', label: '인사', icon: '../../assets/icons/personnel.png', submenu: [
        { type: 'title', label: '인사' },
        { type: 'desc', label: '인사관리' },
        { type: 'button', label: '인당효율' },
        { type: 'button', label: '근태관리' , url : '/src/publish/pages/home/home.html'},
        { type: 'button', label: '직원등록' },
        { type: 'button', label: '면접자 관리' },
        { type: 'button', label: '조 관리' },
        { type: 'button', label: '인사위원회' },
        { type: 'button', label: '조직도' },
        { type: 'desc', label: '교육관리' },
        { type: 'button', label: '교육 이수현황' , url: "../education/education.html"},
        { type: 'button', label: '일반 교육자료' },
        { type: 'button', label: '관리자 교육자료' },
    ] },
    { id: 'account', label: '회계', icon: '../../assets/icons/Accounting.png', submenu: [
        { type: 'title', label: '회계' },
        { type: 'desc', label: '수익' },
        { type: 'button', label: '매출현황' },
        { type: 'button', label: '매출관리' },
        { type: 'button', label: '입금관리' },
        { type: 'button', label: '일반수금관리' },
        { type: 'button', label: '출/퇴근 수금관리' },
        { type: 'desc', label: '급여관리' },
        { type: 'button', label: '급여분포도' },
        { type: 'button', label: '일 근무현황' },
        { type: 'button', label: '주 근무현황' },
        { type: 'button', label: '월 근무현황' },
        { type: 'button', label: '임금테이블' },
        { type: 'button', label: '급여' },
        { type: 'button', label: '급여관리(경리)' },
        { type: 'button', label: '급여관리(관리자)' },
        { type: 'button', label: '회사별 운행' },
        { type: 'button', label: '거래처' },
    ] },
  ];
  
  const mainSidebar = document.getElementById('main-sidebar');
  const subSidebar = document.getElementById('sub-sidebar');
  const pageTitle = document.getElementById('page-title');
  const pageContent = document.getElementById('page-content');
  
  let selectedId = 'null';
  let lastSelectedId = null;  // 마지막으로 클릭된 메뉴

  //메인 사이드 바 함수
  function renderMainSidebar() {
    mainSidebar.innerHTML = '';
  
    // 토글 버튼
    const toggleBtn = document.createElement('button');
    toggleBtn.className = `
      flex flex-col items-center text-center justify-center 
      w-[60px] h-[60px] rounded 
      hover:bg-gray-100
      ${selectedId === 'toggle' ? 'bg-[#EEF1FF] text-[#174AB3]' : 'text-gray-600'}
    `;
    toggleBtn.innerHTML = `
      <img src="../../assets/icons/SNB.png" alt="메뉴" class="w-10 h-10 mb-1 " />
    `;
    toggleBtn.addEventListener('click', toggleSidebarWidth);
    mainSidebar.appendChild(toggleBtn);
  
    // 메뉴 아이템
    menuItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `
        flex flex-col items-center text-center justify-center
        w-[60px] h-[60px] rounded-xl 
        hover:bg-gray-100
        ${selectedId === item.id ? 'bg-[#EEF1FF] text-[#174AB3]' : 'text-gray-600'}
      `;
      btn.dataset.id = item.id;
  
      btn.innerHTML = `
      <img src="${item.icon}" alt="${item.label}" class="w-8 h-8 mb-1" />
      <span class="text-lg select-none">${item.label}</span>
    `;
    
  
      btn.addEventListener('click', () => handleMainMenuClick(item.id));
      mainSidebar.appendChild(btn);
    });
  }
  
  function renderSubSidebar() {
    if (!selectedId) {
      subSidebar.classList.add('hidden');
      pageTitle.innerText = '선택된 메뉴가 없습니다.';
      pageContent.innerText = '메뉴를 선택해주세요.';
      return;
    }
  
    const selectedItem = menuItems.find(i => i.id === selectedId);
    if (!selectedItem) return;
  
    const currentPath = window.location.pathname;
  
    // 현재 경로와 일치하는 submenu 버튼에 selected 적용
    selectedItem.submenu.forEach(sub => {
      if (sub.type === 'button' && sub.url && sub.url === currentPath) {
        sub.selected = true;
      } else {
        sub.selected = false;
      }
    });
  
    subSidebar.classList.remove('hidden');
    subSidebar.innerHTML = '';
  
    selectedItem.submenu.forEach((sub, index) => {
      let el;
      if (sub.type === 'title') {
        el = document.createElement('div');
        el.className = 'font-bold text-[#1f1f21] text-2xl mb-2 p-4 mt-2';
        el.innerText = sub.label;
      } else if (sub.type === 'desc') {
        el = document.createElement('div');
        el.className = 'text-xl text-gray-500 mb-2 mt-1 pb-2 p-3 border-b border-[#F1F1F1]';
        el.innerText = sub.label;
      } else if (sub.type === 'button') {
        el = document.createElement('button');
        el.className = `
        w-[180px] h-[36px] rounded 
        flex items-center px-6 py-4 mb-2 text-left p-3
        hover:bg-gray-100 text-lg
        ${sub.selected ? 'bg-[#EEF1FF] text-[#174AB3] font-bold' : 'text-gray-700'}
      `;
      
        el.innerText = sub.label;
        el.addEventListener('click', () => {
            if (sub.url) {
              selectedItem.submenu.forEach(s => s.selected = false);
              sub.selected = true;
          
              renderSubSidebar(); // UI 먼저 갱신
              renderMainSidebar(); // 메인 사이드바도 다시 그려줘야 하이라이트 반영됨
          
              // 딜레이 후 페이지 이동 
              setTimeout(() => {
                window.location.href = sub.url;
              }, 0);
          
              return;
            }
          
          pageTitle.innerText = sub.label;
          pageContent.innerText = `${sub.label} 페이지 내용입니다.`;
  
          selectedItem.submenu.forEach(s => s.selected = false);
          sub.selected = true;
          renderSubSidebar();
        });
      }
      subSidebar.appendChild(el);
    });
  
    pageTitle.innerText = selectedItem.label;
    pageContent.innerText = `${selectedItem.label} 페이지 입니다.`;
  }
  
  

function toggleSidebarWidth() {
  const isHidden = subSidebar.classList.contains('hidden');

  if (isHidden) {
    // selectedId = 'home';
    renderMainSidebar();
    renderSubSidebar();
    subSidebar.classList.remove('hidden');
  } else {
    subSidebar.classList.add('hidden');
  }
}

  
  
function handleMainMenuClick(id) {
  if (selectedId === id) {
    selectedId = null;
  } else {
    selectedId = id;
    lastSelectedId = id;
  }
  renderMainSidebar();
  renderSubSidebar();
}

  
// 초기 URL 기준 selectedId 설정
function initializeSelectedMenu() {
  const currentPath = window.location.pathname;
  for (const menu of menuItems) {
    for (const sub of menu.submenu) {
      if (sub.type === 'button' && sub.url === currentPath) {
        selectedId = menu.id;
        lastSelectedId = menu.id;
          selectedId = menu.id;
          menu.submenu.forEach(s => s.selected = false); // 초기화
          sub.selected = true; // 현재 버튼만 true
          return;
        }
      }
    }
  }
  
  
  
  initializeSelectedMenu();
  renderMainSidebar();
  renderSubSidebar();
  
  