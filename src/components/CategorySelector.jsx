import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  duration: 2,
};

export default function Categories({ tabs, setTab, activeTab }) {
  return (
    <motion.div className="relative flex flex-row justify-between overflow-hidden w-fit">
      <motion.ul
        layout="position"
        key={activeTab}
        className="flex flex-row justify-around gap-2 mx-auto overflow-hidden shadow-lg bg-primary-content sm:gap-4 rounded-xl w-fit"
        transition={{ layout: { duration: 0.25, ease: 'easeIn' } }}
      >
        {tabs.map((item) => (
          <li
            key={item}
            className="relative inline w-full px-2 py-3 text-center cursor-pointer md:px-4 xl:px-6 group"
            onClick={() => setTab(item)}
          >
            <span
              className={
                'z-50 mx-auto transition-all duration-300 font-semibold text-xs xs:text-sm md:text-md lg:text-lg uppercase group-hover:text-base-content ' +
                (activeTab === item
                  ? ' font-bold text-base-content'
                  : '  text-neutral-content opacity-40')
              }
            >
              {item}
            </span>
            {item === activeTab && (
              <motion.div
                className="absolute top-0 bottom-0 left-0 right-0 border-b-4 bg-base-10 bg-opacity-60 border-neutral-content"
                layoutId="background"
                transition={spring}
              />
            )}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
