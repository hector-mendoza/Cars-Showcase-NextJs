import Image from 'next/image'
import { Hero } from '@/components'
import { SearchBar, CustomFilter, CarCard } from '@/components/'
import { fetchCars } from '@/utils'

export default async function Home() {
  const allCars = await fetchCars();
  // console.log(allCars);

  const isDataEmpty = !Array.isArray(allCars) && allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div id="discover" className='mt-12 padding-x padding-y max-width'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Card Catalog
          </h1>
          <p>
            Explore the cars you love.
          </p>
          <div className='home__filters'>
            <SearchBar />

            <div className='home__filter-container'>
              <CustomFilter title='fuel'/>
              <CustomFilter title='year' />
            </div>
          </div>

          {!isDataEmpty ? (
              <section className='w-full'>
                <div className='home__cars-wrapper'>
                  { allCars?.map((car) => (
                    <CarCard car={car} />
                  ))}
                </div>
              </section>
            ) : (
              <div className='home__error-container'>
                <h2 className='text-black text-xl font-bold'>Oops, no results...</h2>
                <p>{allCars?.message}</p>
              </div>
            )}

        </div>
      </div>
    </main>
  )
}
