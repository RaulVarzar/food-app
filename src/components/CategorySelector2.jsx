import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 800,
  damping: 50,
  duration: 1,
};

export default function Categories({ tabs, setTab, activeTab }) {
  return (
    <motion.ul
      layout="position"
      key={activeTab}
      className="flex flex-col self-start gap-0 px-0 py-0 mx-auto overflow-hidden rounded-lg shadow-xl bg-base-300 sm:gap-0 w-fit"
      transition={{ layout: { duration: 0.25, ease: 'easeIn' } }}
    >
      {tabs.map((item) => (
        <li
          key={item}
          className="relative inline w-full px-8 py-4 text-center cursor-pointer md:px-6 xl:px-8 group "
          onClick={() => setTab(item)}
        >
          <span
            className={
              'z-50 mx-auto transition-all relative duration-300 tracking-wider font-semibold text-xs xs:text-sm md:text-md lg:text-lg uppercase group-hover:text-white group-hover:opacity-70 scale-125 transform-scale-125 transform ' +
              (activeTab === item
                ? ' font-bold text-base-content'
                : '  text-base-content opacity-40 ')
            }
          >
            {item}
          </span>
          {item === activeTab && (
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0 w-full my-0 border-l-4 bg-opacity-10 bg-secondary border-accent"
              layoutId="background"
              transition={spring}
            />
          )}
        </li>
      ))}
    </motion.ul>
  );
}
