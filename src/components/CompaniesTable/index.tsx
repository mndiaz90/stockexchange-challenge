import { ArrowForward } from '@material-ui/icons';
import { ChangeEvent, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { CompaniesContext } from '../../contexts/CompaniesContext';
import Link from 'next/link';

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
		forcePage,
		onSelectCompany,
		companiesSelected
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
							<input
								type="checkbox"
								name="checkSymbol"
								checked={!!companiesSelected.find((symbol: string) => symbol === company.symbol)}
								onChange={(event: ChangeEvent<HTMLInputElement>) => onSelectCompany(event.target.checked, company)}
							/>
							<span>{company.symbol}</span>
							<span>{company.name}</span>
							<span>${company.price}</span>
							<Link href={`companydata/${company.symbol}`}>
								<button>
									<ArrowForward />
								</button>
							</Link>
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
