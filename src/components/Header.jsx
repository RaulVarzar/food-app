import logo from '../images/logo.png';
import BottomMenu from './BottomMenu2.jsx';
import Categories from './CategorySelector2.jsx';
import ViewToggle from './ViewToggle.jsx';

export default function Header({ currentTab, setTab, activeTab, tabs }) {
  return (
    <header className="sticky top-0 left-0 flex flex-col items-center content-center self-start justify-between h-screen max-h-screen py-6 ml-8 text-center w-fit max-w-fit header-section gap-y-2 sm:flex-col align-center">
      <div className="flex flex-col gap-2 mt-6">
        <img src={logo} alt="logo" className="mx-auto w-14" />
        <h3 className="text-xl font-bold text-secondary">RESTAURANT NAME</h3>
      </div>
      <div className="flex flex-col items-stretch gap-y-2 ">
        <Categories
          key={currentTab}
          tabs={tabs}
          setTab={setTab}
          activeTab={activeTab}
        />
        <ViewToggle />
      </div>
      <BottomMenu />
    </header>
  );
}
