declare module 'upng-js' {
  export function encode(
    imgs: ArrayBuffer[],
    w: number,
    h: number,
    cnum: number,
    dels?: number[]
  ): ArrayBuffer;

  export function decode(buffer: ArrayBuffer): {
    width: number;
    height: number;
    depth: number;
    ctype: number;
    frames: ArrayBuffer[];
  };

  export function toRGBA8(img: {
    width: number;
    height: number;
    depth?: number;
    frames?: ArrayBuffer[];
  }): Uint8Array;
}

declare global {
  interface Window {
    UPNG: typeof import('upng-js');
  }
}

export {};
