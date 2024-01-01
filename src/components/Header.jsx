import logo from '../images/logo.png'
import Categories from './CategorySelector.jsx';

export default function Header({currentTab, setTab, activeTab, tabs}) {
    return(
        <header className="flex flex-row items-center content-center justify-center w-full max-w-4xl py-4 mx-auto text-center align-center">
            <img src={logo} alt="logo"  className='h-14 '/>
            <Categories key={currentTab} tabs={tabs} setTab={setTab} activeTab={activeTab} />
        </header>
    )
}