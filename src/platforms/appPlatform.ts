export type AppPlatform = "web" | "android" | "ios" | "windows" | "linux";

export const currentAppPlatform: AppPlatform = "web";

export function encodeBytesToBase64(bytes: Uint8Array): string {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return window.btoa(binary);
}

export function decodeBase64ToBytes(encoded: string): Uint8Array {
    const binary = window.atob(encoded);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
}
