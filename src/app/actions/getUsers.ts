import prisma from '@/app/libs/prismadb';

import getSession from './getSession';

const getUser = () => {
    const session = getSession();
    console.log(session);
};

export default getUser;
