declare module 'picocad-web-viewer/dist/pico-cad-viewer.esm.js' {
    interface Options {
        canvas: HTMLCanvasElement;
    }

    export default class PicocadWebViewer {
        backgroundColor: [number, number, number, number];
        cameraFOV: number;

        constructor(options: Options);

        load(url: string): void;

        setLightDirectionFromCamera(): void;

        setTurntableCamera(
            radius: number,
            spin: number,
            roll: number,
            center: { x: number; y: number; z: number }
        ): void;

        startDrawLoop(callback: (delta: number) => void): void;
    }
}
