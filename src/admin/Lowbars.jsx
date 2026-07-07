import { useState } from "react";
import { LowBar } from "./admin.style";

const LowBars = () => {
  const [page, setPage] = useState(1);
  const totalPage = 7;
  return (
    <LowBar>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        ⏮
      </button>

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        &lt; Previous
      </button>

      <div className="pageWrap">
        {Array.from({ length: totalPage }, (_, i) => {
          const pageNum = i + 1;
          if (
            pageNum === 1 ||
            pageNum === totalPage ||
            (pageNum >= page - 1 && pageNum <= page + 1)
          ) {
            return (
              <button
                key={pageNum}
                className={page === pageNum ? "active" : ""}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          }
          if (pageNum === page - 2 || pageNum === page + 2) {
            return <span key={pageNum}>...</span>;
          }
          return null;
        })}
      </div>
      <button disabled={page === totalPage} onClick={() => setPage(page + 1)}>
        Next &gt;
      </button>
      <button disabled={page === totalPage} onClick={() => setPage(totalPage)}>
        ⏭
      </button>
    </LowBar>
  );
};
export default LowBars;
