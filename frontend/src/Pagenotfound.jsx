
const Pagenotfound = () => {
  return (
    <div className="flex flex-col gap-2 text-black justify-center w-screen items-center h-screen mx-auto">
      <div>
        <img src="public/search.png" alt="img" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl font-semibold">No products found</h1>
        <h1 className="text-lg font-normal opacity-70 px-[2.5rem] text-center">Try adjusting your filters or search terms</h1>
      </div>
    </div>
  )
}

export default Pagenotfound