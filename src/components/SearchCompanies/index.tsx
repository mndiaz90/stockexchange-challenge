import { Search } from "@material-ui/icons";
import styles from './styles.module.scss';

export const SearchCompanies = () => {
    return <div className={styles.container}>
        <Search />
        <input type="text" placeholder="Find" />
    </div>
}
