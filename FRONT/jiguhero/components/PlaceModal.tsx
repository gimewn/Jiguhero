import { ModalBack, ModalDiv,  ModalHeader, HeaderTitle, CloseBtn, ModalBody} from 'components/modal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const PModalBack = styled(ModalBack)`
    top:0;
    left:0;
    height:100vh;
    background-color: rgba(0, 0, 0, 0.3);
`
export default function PlaceModal(prop){
    const {show, setShow} = prop;
    const [searchKey, setSearchKey] = useState<string>();
    function searchReady(){
        var ps = new window.kakao.maps.services.Places();  
    }
    function searchPlaces() {
    
        if (!searchKey.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
    
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(searchKey, placesSearchCB); 
    }
    function placesSearchCB(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
    
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
    
            // 페이지 번호를 표출합니다
            displayPagination(pagination);
    
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
    
            alert('검색 결과가 존재하지 않습니다.');
            return;
    
        } else if (status === window.kakao.maps.services.Status.ERROR) {
    
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
    
        }
    }
    // 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment();
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    for ( var i=0; i<places.length; i++ ) {

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
}}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
 function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}
    
    useEffect(()=>{
        window.window.kakao.maps.load(function(){searchReady()})
      }, [])

    const ModalContent = show && (
        <>

            <ModalDiv>
            <ModalHeader>
                <HeaderTitle>장소 추가하기</HeaderTitle>
                <CloseBtn onClick={() => setShow(false)}/>
            </ModalHeader>
            <ModalBody>
            <div id="menu_wrap" className="bg_white">
            <div className="option">
            <div>
                <form onSubmit={()=>searchPlaces()}>
                    <input type="text" id="keyword" onChange={(e) => {()=>{setSearchKey(e.target.value)}}} /> 
                    <button type="submit">검색하기</button> 
                </form>
            </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
        </div>
            </ModalBody>
            </ModalDiv>
        <PModalBack onClick={()=>{setShow(false)}} />
        </>
    )
    return ModalContent
}