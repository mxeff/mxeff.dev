import { styled } from '@linaria/react';
import { throttle } from 'lodash-es';
import PicoCADViewer from 'picocad-web-viewer/dist/pico-cad-viewer.esm.js';
import { useEffect, useRef } from 'preact/hooks';

const loadPicocad = async () => import('../assets/picocad');

const Canvas = styled.canvas`
    cursor: grab;
    width: 100% !important;
    height: auto !important;
    image-rendering: pixelated;

    &:active {
        cursor: grabbing;
    }
`;

const YouSpinMyHeadRightRound = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const spin = useRef(Math.PI * (300 / 360));
    const viewer = useRef<PicoCADViewer | null>(null);

    const isDragging = useRef(false);

    const handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0 || event.target !== ref.current) {
            return;
        }

        isDragging.current = true;

        event.preventDefault();
    };

    const handleMouseMove = throttle(({ movementX }: MouseEvent) => {
        if (!isDragging.current) {
            return;
        }

        spin.current += movementX * 0.03;
    }, 20);

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        viewer.current = new PicoCADViewer({
            canvas: ref.current,
        });

        void loadPicocad().then((data) => {
            viewer.current?.load(data.default);
        });

        viewer.current.backgroundColor = [0, 0, 0, 0];
        viewer.current.cameraFOV = 40;

        viewer.current.startDrawLoop((delta) => {
            if (!viewer.current) {
                return;
            }

            if (!isDragging.current) {
                spin.current += delta;
            }

            viewer.current.setTurntableCamera(8, spin.current, -0.225, {
                x: 0,
                y: 1,
                z: 0,
            });

            viewer.current.setLightDirectionFromCamera();
        });

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Canvas ref={ref} width="512" height="512" />;
};

export default YouSpinMyHeadRightRound;
