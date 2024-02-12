import { Nav, Search } from '@/components/index';

export default function Messages() {
    return (
        <div className="h-full w-full flex flex-row">
            <div className="bg-zinc-900  h-full w-2/6">
                <Nav />
                <Search />
            </div>
            <div className="bg-gray-700 h-full w-4/6"></div>
        </div>
    );
}
