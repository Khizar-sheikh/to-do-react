import '../styles/Header.css';
import { FontLoader } from '../utils/utils';

const Header = () => {
    return (
        <>
            <FontLoader fontFamilies={['Saira+Condensed:400,700']} />
            <header className="header">
                <h1>To Do List</h1>
            </header>
        </>
    );
};

export default Header;
