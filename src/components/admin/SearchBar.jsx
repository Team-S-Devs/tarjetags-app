import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { FaSearch } from "react-icons/fa";
import useWindowSize from '../../hooks/useWindowsSize';


const SearchBar = (
    {setSearchVal}
    ) => {
        const [searchValue, setSearchValue] = useState("");

        const handleSearchInputChange = (event) => {
            setSearchValue(event.target.value);
        };
    
        const handleSearch = () => {
            setSearchVal(searchValue);
        };

        const {width, height} = useWindowSize()

        return (
            <div className='search-container'>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontSize: width<350 ? '0.85rem' : '1rem'
                    }}
                    placeholder="Buscar email"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <FaSearch />
                </IconButton>
            </Paper>
        </div>
        );
};

export default SearchBar;