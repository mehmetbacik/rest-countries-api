import React from 'react';
import CountryListItem from './CountryListItem';
import { Country } from '../../types/country';

interface CountryListProps {
    countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[40px] md:gap-[50px] lg:gap-[60px] xl:gap-[70px]">
            {countries.map(country => (
                <CountryListItem key={country.alpha3Code} country={country} />
            ))}
        </div>
    );
}

export default CountryList;
