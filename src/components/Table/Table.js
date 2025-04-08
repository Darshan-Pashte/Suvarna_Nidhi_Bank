import React from 'react';
import classes from './Table.module.css';
import TopBar from './TopBar/TopBar';
import Pagination from './Pagination/Pagination';
import { get } from 'lodash';

const Table = ({ columns, data, handleRowClick, topBar, pagination, onScroll }) => {
  return (
    <div className={`${classes.NewTableComponent} Body_M`}>
      {topBar ? <TopBar leftContent={topBar?.leftContent} rightContent={topBar?.rightContent} /> : null}
      {pagination && <Pagination pagination={pagination} />}
      <table className='Body_M'>
        <thead>
          <tr>
            {columns?.map(({ title, width }) => {
              return <th style={{ width }}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody className={pagination ? classes.TbodyHeightMin : classes.TbodyHeightMax} onScroll={onScroll ? () => onScroll() : null}>
          {data?.length ? (
            data?.map((eachObj) => (
              <tr onClick={() => (handleRowClick ? handleRowClick(eachObj) : null)}>
                {columns.map(({ key, render, width, style, stopPropagation }) => (
                  <td
                    style={style ? { ...style } : { width }}
                    onClick={(e) => {
                      stopPropagation && e.stopPropagation();
                    }}
                  >
                    {render ? render(key ? eachObj[key] : eachObj, eachObj) : get(eachObj, key)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length}>
                <div className={classes.nodata}>
                  <div>No Records To Display</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
