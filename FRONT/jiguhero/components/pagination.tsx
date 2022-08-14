import Pagination from 'react-js-pagination';

<<<<<<< HEAD
export default function Paigination({ page, count, setPage }){
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={2}
      totalItemsCount={count}
=======
interface Props {
  page: number;
  totalcount: number;
  setPage: any;
}
export default function Paigination({ page, totalcount, setPage }: Props) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={totalcount}
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};