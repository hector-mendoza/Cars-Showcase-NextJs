'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'
import { Hero } from '@/components'
import { SearchBar, CustomFilter, CarCard, ShowMore } from '@/components/'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
        const result = await fetchCars({
            manufacturer,
            model,
            fuel,
            year,
            limit,
          });
          setAllCars(result);
    } catch (error) {
        console.log(error);
        
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  // const allCars = await fetchCars({
  //   manufacturer: searchParams?.manufacturer || '',
  //   model: searchParams?.model || '',
  //   fuel: searchParams?.fuel || '',
  //   year: searchParams?.year || 2022,
  //   limit: searchParams?.limit || 10,
  // });
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
            <SearchBar 
                setManufacturer={setManufacturer}
                setModel={setModel}
            />

            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
              <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
            </div>
          </div>

          {allCars.length > 0 ? (
              <section className='w-full'>
                <div className='home__cars-wrapper'>
                  { allCars?.map((car) => (
                    <CarCard car={car} />
                  ))}
                </div>

                {loading && (
                  <div className='mt-16 w-full flex-center'>
                    <Image src="/loder.svg" alt="Loading..." width={50} height={50} className='object-contain' />
                  </div>
                )}

                <ShowMore 
                  pageNumber={limit / 10}
                  isNext={( limit ) > allCars?.length}
                  setLimit={setLimit}
                />
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
