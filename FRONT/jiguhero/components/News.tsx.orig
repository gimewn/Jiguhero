import NewsItem from 'components/NewsItem';
import {useQuery} from '@tanstack/react-query';
import {Token, BASE_URL} from 'pages/api/fetch';

export default function News(){
    const getNews = async() => {
        return (await fetch(BASE_URL+'home/promotion', {
            method:'get',
            headers:{
                Authorization : Token
            }
        })).json()
    }
    const {data} = useQuery(['news'], getNews)
    return(
        <>
        {data?.map((item) => (<NewsItem key={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
        </>
    )
}