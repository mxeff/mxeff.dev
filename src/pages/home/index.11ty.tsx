import Intro from '@/components/Intro';
import Default from '@/layouts/Default';

export const data = {
    permalink: '/',
};

const Home = () => (
    <Default title="mxeff">
        <Intro />
    </Default>
);

export default Home;
