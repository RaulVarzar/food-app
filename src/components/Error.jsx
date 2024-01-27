export default function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center px-10 py-8 mx-auto border rounded-lg shadow-lg bg-base-300 w-fit border-neutral md:px-8 lg:px-24">
      <p className="text-3xl font-bold tracking-wider text-gray-300 md:text-4xl lg:text-7xl">
        OOPS!
      </p>
      <p className="py-2 mt-6 text-2xl text-center text-gray-500 border-y-2 border-error">
        {message}
      </p>
    </div>
  );
}
