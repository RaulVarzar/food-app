import UserProgress from '../store/UserProgress';
import { useContext } from 'react';

export default function ViewToggle() {
  const user = useContext(UserProgress);
  const view = user.productsView;
  const changeView = user.changeView;

  return (
    <div className="flex flex-row w-full gap-1 px-1.5 py-1.5 overflow-hidden text-xl rounded-md bg-base-300">
      <button
        className={
          ' btn w-1/2 btn-sm border-none rounded-md ' +
          (view === 'grid' ? ' btn-accent' : ' bg-transparent ')
        }
        onClick={() => changeView('grid')}
      >
        <i className="px-1 fa-solid fa-border-all"> </i>
      </button>
      <button
        className={
          ' btn btn-sm w-1/2 border-none rounded-md ' +
          (view === 'list' ? ' btn-accent' : ' bg-transparent ')
        }
        onClick={() => changeView('list')}
      >
        <i className="px-1 fa-solid fa-list"></i>
      </button>
    </div>
  );
}
