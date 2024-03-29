import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../../services/api';
import { Header } from '../../components/Header';
import { CountryList } from '../../components/CountryList';
import { RegionFilter } from '../../components/RegionFilter';
import { Search } from '../../components/Search';
import { Country } from '../../types/country';

const Home: React.FC = () => {
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getAllCountries();
                setFilteredCountries(countriesData);
                setAllCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleRegionChange = (region: string) => {
        if (region === '') {
            setFilteredCountries(allCountries);
        } else {
            const filtered = allCountries.filter(country => country.region === region);
            setFilteredCountries(filtered);
        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getAllCountries();
                setCountries(countriesData);
                setFilteredCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const filtered = countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredCountries(filtered);
    }, [searchQuery, countries]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="themeHome">
            <Header />
            <main className="themeMain">
                <div className="themeFilter flex justify-between px-12 py-10 items-center">
                    <Search onSearch={handleSearch} />
                    <RegionFilter countries={allCountries} onRegionChange={handleRegionChange} />
                </div>
                <div className="themeList px-12">
                    <CountryList countries={filteredCountries} />
                </div>
            </main>
        </div>
    );
}

export default Home;