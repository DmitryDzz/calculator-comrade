export type CalculatorSoundType =
    | "key-down"
    | "key-up"
    | "tap";

export interface CalculatorAudioFeedbackOptions {
    soundEnabled: boolean;
}

const SOUND_URLS: Record<CalculatorSoundType, string> = {
    "key-down": "/sounds/key-down.ogg",
    "key-up": "/sounds/key-up.ogg",
    "tap": "/sounds/tap.ogg",
};

export class CalculatorAudioFeedback {
    private readonly sounds = new Map<CalculatorSoundType, HTMLAudioElement>();

    private options: CalculatorAudioFeedbackOptions;

    public constructor(options: CalculatorAudioFeedbackOptions) {
        this.options = options;
        this.preloadSounds();
    }

    public setOptions(options: CalculatorAudioFeedbackOptions): void {
        this.options = options;
    }

    public play(soundType: CalculatorSoundType): void {
        if (!this.options.soundEnabled) {
            return;
        }

        const sound = this.sounds.get(soundType);

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
    }

    private preloadSounds(): void {
        for (const [soundType, url] of Object.entries(SOUND_URLS)) {
            const sound = new Audio(url);

            sound.preload = "auto";

            this.sounds.set(soundType as CalculatorSoundType, sound);
        }
    }
}
