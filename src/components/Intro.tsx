import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import Container from './Container';
import Row from './Row';

const containerClass = css`
    display: grid;
    grid-template: 1fr auto 2fr / auto;
    min-height: 100vh;
`;

const rowClass = css`
    align-items: center;
    grid-row: 2;
`;

const AnimatedImage = styled.img`
    image-rendering: pixelated;
`;

const LeftColumn = styled.div`
    grid-column: 2 / 5;
    margin: -3rem;
`;

const RightColumn = styled.div`
    grid-column: 5 / -2;
    margin-left: -1.5rem;
`;

const Logo = styled.img`
    display: block;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
`;

const Intro = () => {
    return (
        <Container class={containerClass}>
            <Row class={rowClass}>
                <LeftColumn>
                    <AnimatedImage
                        alt=""
                        src="/images/you-spin-my-head-right-round.gif"
                    />
                </LeftColumn>
                <RightColumn>
                    <h1>
                        Senior frontend developer and media designer by trade w/
                        years of expertise – still learning everyday from lovely
                        people.
                        <Logo alt="mxeff" src="/images/logo.svg" />
                    </h1>
                </RightColumn>
            </Row>
        </Container>
    );
};

export default Intro;
