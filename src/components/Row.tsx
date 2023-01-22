import { styled } from '@linaria/react';

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 3rem;
    padding: 0 1.5rem;
`;

export default Row;
