import { ArrowForward } from '@material-ui/icons';
import { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { CompaniesContext } from '../../contexts/CompaniesContext';
import styles from './styles.module.scss';

type Company = {
    symbol: string;
    name: string;
    price: number
}

export const CompaniesTable = () => {
    const { currentPageCompanies,
        pageCount,
        handlePageClick,
        forcePage
    } = useContext(CompaniesContext);

    return <>
        <div className={styles.headerTable}>
            <span></span>
            <span>Symbol</span>
            <span>Name</span>
            <span>Price</span>
            <span></span>
        </div>
        <div className={styles.containerData}>
            {
                currentPageCompanies.length ?
                    currentPageCompanies.map((company: Company, index: number) => (
                        <div className={styles.row} key={index}>
                            <input type="checkbox" />
                            <span>{company.symbol}</span>
                            <span>{company.name}</span>
                            <span>${company.price}</span>
                            <button>
                                <ArrowForward />
                            </button>
                        </div>
                    ))
                    :
                    <div className={styles.emptyContainer}>
                        <p>Not found</p>
                    </div>
            }
        </div>
        <ReactPaginate
            previousLabel="&laquo;"
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            nextLabel="&raquo;"
            forcePage={forcePage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"paginationLink"}
            nextLinkClassName={"paginationLink"}
            disabledClassName={"paginationLinkDisabled"}
            activeClassName={"paginationLinkActive"}
        />

    </>
}
