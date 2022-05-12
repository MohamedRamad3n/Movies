import _ from "lodash";
import React from "react";
const Pagination = (props) => {
  const { pageSize, noOfPage, pageChange, currentPage } = props;
  const pageCount = Math.ceil(noOfPage / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => pageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
