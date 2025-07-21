export function showMaterialsPopup(materialsData) {
    // 백드롭
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50';
  
    // 팝업 모달
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-auto relative p-6';
  
    // HTML 구조
    modal.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">교육자료 등록</h2>
  
      <label class="block mb-2">
        <span class="text-gray-700">교육명</span>
        <input type="text" id="popup-title" placeholder="교육명 입력" class="w-full border rounded px-3 py-2" />
      </label>
  
      <label class="block mb-4">
        <span class="text-gray-700">참고사항</span>
        <input type="text" id="popup-note" placeholder="참고사항 입력" class="w-full border rounded px-3 py-2" />
      </label>
  
      <div class="mb-4">
        <span class="text-gray-700">교육 대상자</span>
        <div class="mt-2 flex space-x-4 border border-gray-300 rounded p-3">
          <label class="flex items-center">
            <input type="checkbox" value="기사" class="mr-2" /> 기사
          </label>
          <label class="flex items-center">
            <input type="checkbox" value="관리자" class="mr-2" /> 관리자
          </label>
        </div>
      </div>
  
      <div class="mb-4">
        <span class="text-gray-700">필수 이수주기</span>
        <div class="mt-2 flex space-x-2">
          <button type="button" class="px-4 py-2 border rounded selection-btn">매월</button>
          <button type="button" class="px-4 py-2 border rounded selection-btn">분기</button>
          <button type="button" class="px-4 py-2 border rounded selection-btn">1년</button>
        </div>
      </div>
  
<div class="mb-4">
  <span class="text-gray-700 block mb-2">파일 첨부</span>
  <div class="mt-2 border border-dashed border-gray-300 h-[168px] flex flex-col items-center justify-center p-4">
    <!-- 여기서 flex 부모가 이미지까지 감싸므로 items-center로 centering -->
    <div class="flex flex-col items-center text-gray-500 mb-4">
      <img src="../../assets/icons/downLoad.png"
           alt="다운로드 아이콘"
           class="w-8 h-8 mb-2" />
      <p class="text-center">이곳에 파일을 끌어 넣거나 내 컴퓨터에서<br>가져올 파일을 선택해주세요</p>
      <p class="text-xs text-gray-400">(50MB 이하)</p>
    </div>
    <button id="file-select-btn" class="px-4 py-2 bg-gray-200 rounded">
      파일 선택하기 &gt;
    </button>
  </div>
  <div id="file-list" class="mt-2 space-y-2"></div>
</div>

  
      <hr class="my-4 border-gray-200" />
      <div class="flex justify-end space-x-2">
        <button id="popup-cancel" class="px-4 py-2 border rounded">닫기</button>
        <button id="popup-submit" class="px-4 py-2 bg-blue-600 text-white rounded">등록</button>
      </div>
    `;
  
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
  
    // 닫기 버튼
    modal.querySelector('#popup-cancel').addEventListener('click', () => backdrop.remove());
  
    // 주기 선택 버튼
    modal.querySelectorAll('.selection-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.selection-btn').forEach(b => b.classList.remove('bg-gray-800', 'text-white'));
        btn.classList.add('bg-gray-800', 'text-white');
      });
    });
  
    // 파일 선택 버튼
    const fileList = modal.querySelector('#file-list');
    modal.querySelector('#file-select-btn').addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        const file = e.target.files[0];
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-2 border rounded';
        item.innerHTML = `
          <span class="text-sm">${file.name}</span>
          <button class="text-red-500">&times;</button>
        `;
        item.querySelector('button').addEventListener('click', () => item.remove());
        fileList.appendChild(item);
      };
      input.click();
    });
  
    // (등록 처리 로직 추가)
  }
  