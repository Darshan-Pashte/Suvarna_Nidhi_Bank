import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { usePagination } from './usePagination';
export default function GridTablePagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 4,
        currentPage,
        pageSize,
    } = props;
    // [1,2,3,4,5,16]
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }
    const firstPage = () => {
        onPageChange(1);
    }
    const lastPages = () => {
        onPageChange(lastPage);
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    const prevTen = () => {
        onPageChange(currentPage - 10);
    }
    const nextTen = () => {
        onPageChange(currentPage + 10);
    }

    // 16
    // let lastPage = paginationRange[paginationRange.length - 1];
    const lastPage = Math.ceil(totalCount / pageSize);
    // if (lastPage > 6) {
    //     let onlyPage = paginationRange.pop();

    // }

    // let  onlyPage = paginationRange.pop();
    // console.error("I am here", lastPage );


    // useEffect(() => {

    // }, [])   

    return (
        <div className="paginationWrapper">
            <div className="paginationCopy">
                <Button className="buttons" onClick={firstPage} disabled={currentPage === 1}>First</Button>
                <Button className="buttons" disabled={currentPage <= 10} onClick={prevTen}>Prev 10</Button>
                <Button className="buttons" disabled={currentPage === 1} onClick={onPrevious}>Prev</Button>
                {paginationRange?.map((pageNumber, key, i) => {
                    return (
                        <Button onClick={() => onPageChange(pageNumber)}
                            className={pageNumber === currentPage ? "active" : ""} key={i + key + pageNumber}>{pageNumber}</Button>
                    );
                })}
                <Button className="buttons" disabled={totalCount === 0 || currentPage === lastPage} onClick={onNext}>Next</Button>
                <Button className="buttons" disabled={lastPage - currentPage < 10} onClick={nextTen}>Next 10</Button>
                <Button className="buttons" disabled={totalCount === 0 || currentPage === lastPage} onClick={lastPages}>Last</Button>
                <span className="count">Page {lastPage === 0 ? 0 : currentPage} of {lastPage}</span>
            </div>
        </div>
    )
}