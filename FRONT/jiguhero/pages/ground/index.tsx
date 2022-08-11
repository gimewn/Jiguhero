import BackTitle from 'components/back';
import styled from 'styled-components';
import getAllGround from 'pages/api/ground/getAllGround';
import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Paigination from 'components/pagination';

const Grid = styled('div')`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
  }
  margin-left:30px;
  margin-top:20px;
  margin-right:30px;
`
const GroundItem = styled('div')`
    border: 1px solid #65ace2;
    padding:20px;
    border-radius: 20px;
    margin: 0 10px 20px 10px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const GroundTitle = styled('p')`
    margin:5px auto;
    font-weight: bold;
    font-size: 15px;
`
const GroundIcon = styled('p')`
    margin:0;
    font-size:25px;
`
const GroundPlaceLength = styled('p')`
    margin:0;
    font-size:13px;
`
export default function GroundList(){
    const router = useRouter();
    const {data:AllGround} = useQuery(['allGround'], getAllGround) //리스트에 나타낼 아이템
    const [count, setCount] = useState(0); //아이템 총 개수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(12); //페이지당 아이템 개수
    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    useEffect(() => {
        setCount(AllGround?.length);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(AllGround?.slice(indexOfFirstPost, indexOfLastPost));
      }, [currentpage, indexOfFirstPost, indexOfLastPost, postPerPage]);
      
      const setPage = (e) => {
        setCurrentpage(e);
      };

    return(
        <div>
            <BackTitle name={'대원들의 활동구역'}/>
            <Grid>
                {currentPosts?.map((item)=>(<GroundItem key={item.groundId} onClick={() => {router.push(`ground/${item.groundId}`)}}>
                <GroundIcon>{item.icon}</GroundIcon>
                <GroundTitle>{item.title}</GroundTitle>
                {item.placeIdList ? <GroundPlaceLength>{item.placeIdList.length}개의 장소</GroundPlaceLength> : <GroundPlaceLength>0개의 장소</GroundPlaceLength>}
                </GroundItem>))}
            </Grid>
            <Paigination page={currentpage} count={count} setPage={setPage} />
            
        </div>
    )
}