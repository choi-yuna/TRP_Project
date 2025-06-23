const menuItems = [
    { 
      id: 'home', label: '홈', icon: '../../assets/icons/home.png',
      submenu: [
        { type: 'title', label: '홈' },
        { type: 'desc', label: '홈 페이지 요약' },
        { type: 'button', label: '대시보드' },
        { type: 'button', label: '통계' }
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
        { type: 'desc', label: '중요 공지사항' },
        { type: 'button', label: '전체 공지' },
        { type: 'button', label: '내 공지' }
      ]
    },
    { 
      id: 'office', label: '사무', icon: '../../assets/icons/officeWork.png',
      submenu: [
        { type: 'title', label: '사무' },
        { type: 'desc', label: '사무 관련 메뉴' },
        { type: 'button', label: '전자결재' },
        { type: 'button', label: '문서 관리' }
      ]
    },
    { id: 'car', label: '차량', icon: '../../assets/icons/Vehicle.png', submenu: [
        { type: 'title', label: '차량' },
        { type: 'desc', label: '차량관리' },
        { type: 'button', label: '대당효율' },
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
        { type: 'button', label: '운행 효율' },
        { type: 'button', label: '점호 관리' },
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
        { type: 'button', label: '제로공차' },
        { type: 'button', label: '출퇴근 배차' },
    ] },
    { id: 'hr', label: '인사', icon: '../../assets/icons/personnel.png', submenu: [
        { type: 'title', label: '인사' },
        { type: 'desc', label: '인사관리' },
        { type: 'button', label: '인당효율' },
        { type: 'button', label: '직원등록' },
        { type: 'button', label: '면접자 관리' },
        { type: 'button', label: '조 관리' },
        { type: 'button', label: '인사위원회' },
        { type: 'button', label: '조직도' },
        { type: 'desc', label: '교육관리' },
        { type: 'button', label: '교육 이수현황' },
        { type: 'button', label: '일반 교육자료' },
        { type: 'button', label: '관리자 교육자료' },
    ] },
    { id: 'account', label: '회계', icon: '../../assets/icons/Accounting.png', submenu: [
        { type: 'title', label: '수익' },
        { type: 'desc', label: '매출현황' },
        { type: 'button', label: '매출관리' },
        { type: 'button', label: '입금관리' },
        { type: 'button', label: '일반수금관리' },
        { type: 'button', label: '출/퇴근 수금관리' },
        { type: 'desc', label: '급여관리' },
        { type: 'button', label: '급여분포도' },
        { type: 'button', label: '군무현황' },
        { type: 'button', label: '임금테이블' },
        { type: 'button', label: '급여' },
        { type: 'button', label: '거래처' },
    ] },
  ];
  
  const mainSidebar = document.getElementById('main-sidebar');
  const subSidebar = document.getElementById('sub-sidebar');
  const pageTitle = document.getElementById('page-title');
  const pageContent = document.getElementById('page-content');
  
  let selectedId = 'null';
  
  //메인 사이드 바 함수
  function renderMainSidebar() {
    mainSidebar.innerHTML = '';
  
    // 토글 버튼
    const toggleBtn = document.createElement('button');
    toggleBtn.className = `
      flex flex-col items-center text-center 
      w-[60px] h-[60px] rounded 
      hover:bg-gray-100
      ${selectedId === 'toggle' ? 'bg-[#EEF1FF] text-[#174AB3]' : 'text-gray-600'}
    `;
    toggleBtn.innerHTML = `
      <img src="../../assets/icons/SNB.png" alt="메뉴" class="w-8 h-8 mb-1" />
    `;
    toggleBtn.addEventListener('click', toggleSidebarWidth);
    mainSidebar.appendChild(toggleBtn);
  
    // 메뉴 아이템
    menuItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `
        flex flex-col items-center text-center justify-center
        w-[60px] h-[60px] rounded 
        hover:bg-gray-100
        ${selectedId === item.id ? 'bg-[#EEF1FF] text-[#174AB3]' : 'text-gray-600'}
      `;
      btn.dataset.id = item.id;
  
      btn.innerHTML = `
        <img src="${item.icon}" alt="${item.label}" class="w-6 h-6 mb-1" />
        <span class="text-xs select-none">${item.label}</span>
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
  
    subSidebar.classList.remove('hidden');
    subSidebar.innerHTML = '';
    selectedItem.submenu.forEach((sub, index) => {
        let el;
        if (sub.type === 'title') {
          el = document.createElement('div');
          el.className = 'font-bold text-lg mb-2';
          el.innerText = sub.label;
        } else if (sub.type === 'desc') {
          el = document.createElement('div');
          el.className = 'text-xs text-gray-500 mb-2 mt-1 pb-2 border-b border-[#F1F1F1]';
          el.innerText = sub.label;
        } else if (sub.type === 'button') {
          el = document.createElement('button');
          el.className = `
            w-[180px] h-[36px] rounded 
            flex items-center px-3 py-2 mb-2 text-left
            hover:bg-gray-100 text-sm
            ${sub.selected ? 'bg-[#EEF1FF] text-[#174AB3]' : 'text-gray-700'}
          `;
          el.innerText = sub.label;
          el.addEventListener('click', () => {
            pageTitle.innerText = sub.label;
            pageContent.innerText = `${sub.label} 페이지 내용입니다.`;
    
            // 서브 버튼 선택 상태 관리
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
    subSidebar.classList.remove('hidden');
  } else {
    subSidebar.classList.add('hidden');
  }
  
  // 토글 클릭 시 홈으로 이동
  handleMainMenuClick('home');
}

  
  

  
  function handleMainMenuClick(id) {
    if (selectedId === id) return; // 같은 메뉴 중복 선택 방지
    selectedId = id;
    renderMainSidebar();
    renderSubSidebar();
  }
  
  // 초기 렌더링
  renderMainSidebar();
  renderSubSidebar();
  