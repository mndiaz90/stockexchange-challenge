import { ChangeEvent, createContext, useEffect, useState } from "react";

type Company = {
    symbol: string;
    name: string;
    price: number;
}

type CompaniesContextData = {
    inputSearch: string;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
    currentPageCompanies: Company[];
    pageCount: number;
    handlePageClick: ({ }) => void;
    setAllCompanies: Function,
    forcePage: number;
}

export const CompaniesContext = createContext({} as CompaniesContextData);

export const CompaniesContextProvider = ({ children }) => {
    const [inputSearch, setInputSearch] = useState("");
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [forcePage, setForcePage] = useState(0);
    const [allCompanies, setAllCompanies] = useState<Company[]>([]);
    const [currentPageCompanies, setCurrentPageCompanies] = useState<Company[]>([]);
    const perPage = 5;

    useEffect(() => {
        if (allCompanies.length) {
            setPageCount(allCompanies.length / perPage);
            setCurrentPageCompanies(allCompanies.slice(offset, offset + perPage));
        }
    }, [allCompanies]);

    function handlePageClick({ selected }) {
        let filteredCompanies = allCompanies.filter((company: Company) => {
            return company.symbol.toLowerCase().includes(inputSearch.toLowerCase().trim())
        });
        setOffset(Math.ceil(selected * perPage));
        setForcePage(selected);
        setCurrentPageCompanies(filteredCompanies.slice(selected * perPage, (selected * perPage) + perPage));
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputSearch(event.target.value);

        let filteredCompanies = allCompanies.filter((company: Company) => {
            return company.symbol.toLowerCase().includes(event.target.value.toLowerCase().trim())
        });

        setOffset(0);
        setForcePage(0);
        setPageCount(filteredCompanies.length / perPage);
        setCurrentPageCompanies(filteredCompanies.slice(0, 0 + perPage));
    }

    return <CompaniesContext.Provider
        value={{
            inputSearch,
            onChangeInput,
            currentPageCompanies,
            pageCount,
            handlePageClick,
            setAllCompanies,
            forcePage
        }}>
        {children}
    </CompaniesContext.Provider>
}
