/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Menu = styled('div')`
  display: flex;
  justify-content: start;
  align-items: center;
  a{
    font-family:'PyeongChang-Bold';
    margin: 0 10px;
    color:#555555;
    font-size:15px;
  }
  a:hover{
    color:#65ACE2;
  }
  .active{
    color:#65ACE2;
  }
`
if (process.browser){
  var navContainer = document.getElementById("NavBar");
  var menus = navContainer.getElementsByClassName("navMenu");
  for (var i = 0; i < menus.length; i++) {  
    menus[i].addEventListener("click", function() {  
    var current = document.getElementsByClassName("active");  
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");  
    }  
    this.className += " active";  
    });  
  }  
}

export default function UnderlineLink() {
  return (
    <Menu id="NavBar">
      <Link href="/" className="navMenu">
        <a className="navMenu active">메인</a>
      </Link>
      <Link href="/ground" className="navMenu">
        <a className="navMenu">활동구역</a>
      </Link>
      <Link href="/mission" className="navMenu">
        <a className="navMenu">대원들의 임무</a>
      </Link>
      <Link href="/mission/nowjoin" className="navMenu">
        <a className="navMenu">임무 인증</a>
      </Link>
      <Link href="/mypage" className="navMenu">
        <a className="navMenu">마이페이지</a>
      </Link>
    </Menu>
  );
}