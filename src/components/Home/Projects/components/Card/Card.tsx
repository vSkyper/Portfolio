export default function Card() {
  return (
    <div className='relative h-0 pb-[55%] min-w-[85%] lg:pb-[35%] lg:min-w-[55%] xl:pb-[25%] xl:min-w-[45%] bg-[url("/image.webp")] bg-cover bg-no-repeat rounded-3xl ml-2 sm:ml-6 transition-all hover:scale-[.98]'>
      <div className='absolute top-0 left-0 ml-2 mt-2 sm:ml-7 sm:mt-7 text-sm sm:text-lg'>
        REACTJS
      </div>
      <div className='absolute bottom-0 right-0 mr-2 mb-2 sm:mr-7 sm:mb-7 text-sm sm:text-lg'>
        CRYPTOCURRENCY TAILWIND
      </div>
    </div>
  );
}
