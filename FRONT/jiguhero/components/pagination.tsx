import Pagination from 'react-js-pagination';

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
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};
