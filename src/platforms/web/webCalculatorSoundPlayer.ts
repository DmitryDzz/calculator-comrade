export type WebCalculatorSoundUrls = Record<string, string>;

export interface WebCalculatorSoundPlayer {
    unlockAsync: () => Promise<void>;
    playSoundAsync: (soundUrl: string) => Promise<void>;
}

export function createWebCalculatorSoundPlayer(
    soundUrls: WebCalculatorSoundUrls,
): WebCalculatorSoundPlayer {
    const audioContext = createAudioContext();
    const sounds = new Map<string, AudioBuffer>();

    void preloadSoundsAsync(audioContext, soundUrls, sounds);

    return {
        unlockAsync: async () => {
            try {
                await audioContext.resume();
            } catch { /* empty */ }
        },

        playSoundAsync: async (soundUrl: string) => {
            try {
                await playSoundAsync(audioContext, sounds, soundUrl);
            } catch { /* empty */ }
        },
    };
}

async function preloadSoundsAsync(
    audioContext: AudioContext,
    soundUrls: WebCalculatorSoundUrls,
    sounds: Map<string, AudioBuffer>,
): Promise<void> {
    for (const soundUrl of Object.values(soundUrls)) {
        try {
            const response = await fetch(soundUrl);
            const arrayBuffer = await response.arrayBuffer();
            const soundBuffer = await audioContext.decodeAudioData(arrayBuffer);
            sounds.set(soundUrl, soundBuffer);
        } catch (error: unknown) {
            console.error("[sound] preload failed:", soundUrl, error);
        }
    }
}

async function playSoundAsync(
    audioContext: AudioContext,
    sounds: Map<string, AudioBuffer>,
    soundUrl: string,
): Promise<void> {
    const soundBuffer = sounds.get(soundUrl);
    if (!soundBuffer) {
        console.warn("[sound] skipped, buffer not loaded:", soundUrl);
        return;
    }

    try {
        if (audioContext.state !== "running") {
            console.warn("[sound] skipped, context is not running:", audioContext.state);
            return;
        }

        const source = audioContext.createBufferSource();

        source.buffer = soundBuffer;
        source.connect(audioContext.destination);

        source.start(0);
    } catch (error: unknown) {
        console.error("[sound] play failed:", soundUrl, error);
    }
}

function createAudioContext(): AudioContext {
    const AudioContextCtor =
        window.AudioContext ||
        (
            window as typeof window & {
                webkitAudioContext?: typeof AudioContext;
            }
        ).webkitAudioContext;

    if (!AudioContextCtor) {
        throw new Error("Web Audio API is not supported.");
    }

    return new AudioContextCtor();
}
