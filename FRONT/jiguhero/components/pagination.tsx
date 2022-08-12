import Pagination from 'react-js-pagination';

export default function Paigination({ page, count, setPage }){
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={2}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};