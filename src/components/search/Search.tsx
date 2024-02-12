import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

const Search = () => {
    return (
        <div className="relative w-full px-4 pt-2">
            <input
                type="text"
                placeholder="Search"
                className="w-full p-1 pl-8 rounded-lg bg-gray-800 text-white relative"
            />
            <IconButton className="absolute left-4 top-[9.5px]">
                <SearchIcon color="action" />
            </IconButton>
        </div>
    );
};

export default Search;
