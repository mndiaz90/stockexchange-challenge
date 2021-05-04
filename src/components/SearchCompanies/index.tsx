import { Search } from "@material-ui/icons";
import { ChangeEvent, useContext } from "react";
import { CompaniesContext } from "../../contexts/CompaniesContext";

import styles from './styles.module.scss';

export const SearchCompanies = () => {
    const { inputSearch, onChangeInput } = useContext(CompaniesContext);

    return <div className={styles.container}>
        <Search />
        <input type="text"
            placeholder="Search"
            value={inputSearch}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeInput(event)} />
    </div>
}
