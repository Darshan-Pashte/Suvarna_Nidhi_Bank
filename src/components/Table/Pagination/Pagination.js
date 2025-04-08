import React, { useState } from 'react';
import ChevronLeft from '../../../assets/chevron-left.svg';
import ChevronRight from '../../../assets/chevron-right.svg';
import ChevronUp from '../../../assets/chevron-up.svg';
import ChevronDown from '../../../assets/chevron-down.svg';
import ReactPaginate from 'react-paginate';
import { PAGINATION_LIMIT } from '../../../constants';
import classes from '../Table.module.css';
import { Popover } from 'react-tiny-popover';

const Pagination = ({ pagination }) => {
  const { page, setPage, pageSize, hideSizeChanger = false, totalCount, setPageSize } = pagination;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const PROCESSED_PAGINATION_LIMIT = pageSize ? pageSize : PAGINATION_LIMIT;
  const pageCount = Math.ceil(totalCount / PROCESSED_PAGINATION_LIMIT);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const onPageSizeChange = (value) => {
    setPageSize(value);
  };
  const options = [25, 50, 100];
  return (
    !!totalCount && (
      <div className={`${classes.PaginationContainer} Body_S`}>
        {!hideSizeChanger ? (
          <div className={classes.PageSizeChanger}>
            Show
            <Popover
              isOpen={isPopoverOpen}
              positions={'top'}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={
                <div className={classes.DropMenu}>
                  {options.map((option) => (
                    <div
                      className={pageSize === option ? `${classes.EachMenu} ${classes.SelectedMenu}` : classes.EachMenu}
                      onClick={() => {
                        onPageSizeChange(option);
                        setIsPopoverOpen(!isPopoverOpen);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              }
            >
              <div className={classes.MiniDropdown} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                {PROCESSED_PAGINATION_LIMIT} <img src={isPopoverOpen ? ChevronUp : ChevronDown} alt='' />{' '}
              </div>
            </Popover>
            per page
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <ReactPaginate
            containerClassName='new-pagination'
            forcePage={page}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => handlePageChange(selected)}
            breakLabel='...'
            nextLabel={<img src={ChevronRight} alt='' />}
            previousLabel={<img src={ChevronLeft} alt='' />}
          />
        </div>
      </div>
    )
  );
};

export default Pagination;
