
const getCurrentUser = async (email: string) => {
    try {
        const response = await fetch('/api/get-users/get-current-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default getCurrentUser;
