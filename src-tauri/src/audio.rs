use std::io::Cursor;
use std::sync::mpsc::{self, Sender};
use std::thread;

use rodio::{Decoder, OutputStream, Sink};

const KEY_DOWN_SOUND: &[u8] = include_bytes!("../../public/sounds/key-down.wav");
const TAP_SOUND: &[u8] = include_bytes!("../../public/sounds/tap.wav");

pub struct AudioPlayer {
    sender: Sender<AudioCommand>,
}

enum AudioCommand {
    Play(&'static [u8]),
}

impl AudioPlayer {
    pub fn new() -> Self {
        let (sender, receiver) = mpsc::channel::<AudioCommand>();

        let spawn_result = thread::Builder::new()
            .name("calculator-comrade-audio".to_string())
            .spawn(move || {
                let (_stream, stream_handle) = match OutputStream::try_default() {
                    Ok(output) => output,
                    Err(error) => {
                        log::warn!("Native audio output is not available: {error}");
                        return;
                    }
                };

                for command in receiver {
                    match command {
                        AudioCommand::Play(sound_bytes) => {
                            let cursor = Cursor::new(sound_bytes);
                            let source = match Decoder::new(cursor) {
                                Ok(source) => source,
                                Err(error) => {
                                    log::warn!("Failed to decode desktop sound: {error}");
                                    continue;
                                }
                            };

                            let sink = match Sink::try_new(&stream_handle) {
                                Ok(sink) => sink,
                                Err(error) => {
                                    log::warn!("Failed to create desktop sound sink: {error}");
                                    continue;
                                }
                            };

                            sink.append(source);
                            sink.detach();
                        }
                    }
                }
            });

        if let Err(error) = spawn_result {
            log::warn!("Failed to start native audio thread: {error}");
        }

        Self { sender }
    }

    fn play(&self, sound_type: &str) -> Result<(), String> {
        let sound_bytes = sound_bytes_for_type(sound_type)
            .ok_or_else(|| format!("Unsupported desktop sound type: {sound_type}"))?;

        self.sender
            .send(AudioCommand::Play(sound_bytes))
            .map_err(|_| "Native audio thread is not available".to_string())
    }
}

impl Default for AudioPlayer {
    fn default() -> Self {
        Self::new()
    }
}

#[tauri::command]
pub fn play_sound(sound_type: String, player: tauri::State<'_, AudioPlayer>) -> Result<(), String> {
    player.inner().play(&sound_type)
}

fn sound_bytes_for_type(sound_type: &str) -> Option<&'static [u8]> {
    match sound_type {
        "key-down" => Some(KEY_DOWN_SOUND),
        "tap" => Some(TAP_SOUND),
        _ => None,
    }
}
