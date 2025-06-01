import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="relative bg-primary-1">
            <div className="flex items-center h-16 border border-primary-3">
                <div className="h-full border-r border-primary-3">
                    <Link
                        to="/"
                        className="flex items-center w-full h-full pl-5 text-base duration-300 mr-28 text-primary-2 hover:text-primary-7"
                    >
                        q1sh0x
                    </Link>
                </div>
                <div className="flex items-center h-full flex-1">
                    <ul className="flex flex-row text-base text-primary-2 h-full w-auto">
                        <li className="relative flex h-full group/nav">
                            <Link
                                to="/"
                                className="flex items-center h-full px-7 py-0 duration-200 border-r text-nowrap text-primary-2 border-primary-3 hover:bg-transparent"
                            >
                                _hello
                            </Link>
                            <span className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 bg-primary-4 group-hover/nav:w-full"></span>
                        </li>
                        <li className="relative flex h-full group/nav">
                            <Link
                                to="/about"
                                className="flex items-center h-full px-7 py-0 duration-200 border-r text-nowrap text-primary-2 border-primary-3 hover:bg-transparent"
                            >
                                _about-me
                            </Link>
                            <span className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 bg-primary-4 group-hover/nav:w-full"></span>
                        </li>
                        <li className="relative flex h-full group/nav">
                            <Link
                                to="/projects"
                                className="flex items-center h-full px-7 py-0 duration-200 border-r text-nowrap text-primary-2 border-primary-3 hover:bg-transparent"
                            >
                                _projects
                            </Link>
                            <span className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 bg-primary-4 group-hover/nav:w-full"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;