import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { define } from 'preactement/es5';
import Container from './Container';
import Row from './Row';

const YouSpinMyHeadRightRoundComponent = define(
    'you-spin-my-head-right-round',
    // eslint-disable-next-line react/display-name
    () => () => null
);

const containerClass = css`
    display: grid;
    grid-template: 1fr auto 2fr / auto;
    min-height: 100vh;
`;

const rowClass = css`
    align-items: center;
    grid-row: 2;
    min-height: 33rem;
`;

const LeftColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 2 / 5;
    margin: -3rem;
    position: relative;

    > * {
        width: 100%;
        z-index: 2;
    }

    ::before {
        display: inline-block;
        content: '';
        background-image: url(${require('../../public/images/pattern.webp')});
        width: 100%;
        padding-top: 100%;
        position: absolute;
        transform: rotate(-15deg);
    }
`;

const RightColumn = styled.div`
    grid-column: 6 / -2;
    margin-left: -1.5rem;
    position: relative;
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
                    <YouSpinMyHeadRightRoundComponent />
                </LeftColumn>
                <RightColumn>
                    <h1>
                        Senior frontend developer and media designer by trade w/
                        years of expertise – still learning everyday from lovely
                        people.
                        <Logo
                            alt="mxeff"
                            src="/images/logo.svg"
                            width="90"
                            height="30"
                        />
                    </h1>
                </RightColumn>
            </Row>
        </Container>
    );
};

export default Intro;
