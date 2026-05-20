import type {
    CalculatorSoundPlayer,
    CalculatorSoundUrls,
} from "./calculatorSoundFeedback.ts";

export function createWebCalculatorSoundPlayer(
    soundUrls: CalculatorSoundUrls,
): CalculatorSoundPlayer {
    const sounds = preloadSounds(soundUrls);

    return {
        playSound: (soundUrl: string) => {
            const sound = sounds.get(soundUrl);

            if (!sound) {
                return;
            }

            try {
                sound.currentTime = 0;

                void sound.play().catch(() => {
                    /*
                     * Audio may be blocked before a user gesture or by browser policy.
                     * Sound feedback must never break calculator input.
                     */
                });
            } catch {
                /*
                 * Keep calculator input independent from optional sound feedback.
                 */
            }
        },
    };
}

function preloadSounds(soundUrls: CalculatorSoundUrls): Map<string, HTMLAudioElement> {
    const sounds = new Map<string, HTMLAudioElement>();

    for (const soundUrl of Object.values(soundUrls) as string[]) {
        const sound = new Audio(soundUrl);

        sound.preload = "auto";

        sounds.set(soundUrl, sound);
    }

    return sounds;
}
