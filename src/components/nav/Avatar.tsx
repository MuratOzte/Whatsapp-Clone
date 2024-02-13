import Avatar from '@mui/material/Avatar';

const pp =
    'https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_AdS2npNoS5tNGpkUM8vplqSi2XlK-2TC4YoK6JXZVFYj8A&oe=65D6830D&_nc_sid=e6ed6c&_nc_cat=101';

const AvatarSection = () => {
    return (
        <div className="flex w-1/12 h-full items-center">
            <Avatar
                alt="Profile Picture"
                src={pp}
                sx={{
                    width: '48px',
                    height: '48px',
                }}
            />
        </div>
    );
};

export default AvatarSection;
