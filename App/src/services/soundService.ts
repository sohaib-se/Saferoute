import { Vibration } from 'react-native';

// Safely require expo-av so app won't crash in Expo Go where ExponentAV native module may not be present
let AudioModule: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoAv = require('expo-av');
  AudioModule = expoAv.Audio || null;
} catch (e) {
  console.warn('expo-av native module (ExponentAV) not available in this environment:', e);
}

class SoundManager {
  private currentSound: any = null;
  private currentMode: 'ringback' | 'incoming' | 'end' | null = null;

  private async configureAudio() {
    if (!AudioModule) return;
    try {
      await AudioModule.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    } catch {
      // Audio mode fallback
    }
  }

  /**
   * Outgoing ringback tone: Played to the caller while the call is ringing
   */
  async playRingback() {
    if (this.currentMode === 'ringback') return;
    await this.stopAll();
    this.currentMode = 'ringback';

    if (!AudioModule) return;
    try {
      await this.configureAudio();
      const { sound } = await AudioModule.Sound.createAsync(
        require('../../assets/sounds/ringback.wav'),
        { isLooping: true, volume: 0.85 }
      );
      this.currentSound = sound;
      await sound.playAsync();
    } catch (e) {
      console.warn('Failed to play ringback sound:', e);
    }
  }

  /**
   * Incoming ringtone: Played to the callee accompanied by phone vibration
   */
  async playIncomingRingtone() {
    if (this.currentMode === 'incoming') return;
    await this.stopAll();
    this.currentMode = 'incoming';
    try {
      try {
        Vibration.vibrate([1000, 1000, 1000, 1000], true);
      } catch {
        // Ignore vibration errors on web or unsupported devices
      }

      if (!AudioModule) return;
      await this.configureAudio();
      const { sound } = await AudioModule.Sound.createAsync(
        require('../../assets/sounds/incoming_ring.wav'),
        { isLooping: true, volume: 1.0 }
      );
      this.currentSound = sound;
      await sound.playAsync();
    } catch (e) {
      console.warn('Failed to play incoming ringtone:', e);
    }
  }

  /**
   * Call end tone: Short double beep when a call is hung up, declined, or missed
   */
  async playCallEnd() {
    await this.stopAll();
    this.currentMode = 'end';

    if (!AudioModule) return;
    try {
      const { sound } = await AudioModule.Sound.createAsync(
        require('../../assets/sounds/call_end.wav'),
        { isLooping: false, volume: 0.7 }
      );
      this.currentSound = sound;
      await sound.playAsync();
      setTimeout(() => {
        if (this.currentMode === 'end') {
          this.stopAll();
        }
      }, 1000);
    } catch (e) {
      console.warn('Failed to play call end sound:', e);
    }
  }

  /**
   * Stops all active ringtones, ringbacks, and vibrations
   */
  async stopAll() {
    try {
      Vibration.cancel();
    } catch {}

    if (this.currentSound) {
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
      } catch {}
      this.currentSound = null;
    }
    this.currentMode = null;
  }
}

export const soundManager = new SoundManager();
