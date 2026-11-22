import { Vibration } from 'react-native';

class SoundManager {
  private currentMode: 'ringback' | 'incoming' | 'end' | null = null;

  /**
   * Outgoing ringback tone: Signals call is ringing
   */
  async playRingback() {
    if (this.currentMode === 'ringback') return;
    await this.stopAll();
    this.currentMode = 'ringback';
  }

  /**
   * Incoming ringtone: Vibrates phone when receiving a call
   */
  async playIncomingRingtone() {
    if (this.currentMode === 'incoming') return;
    await this.stopAll();
    this.currentMode = 'incoming';
    try {
      Vibration.vibrate([1000, 1000, 1000, 1000], true);
    } catch {
      // Ignore vibration errors on web or unsupported devices
    }
  }

  /**
   * Call end tone: Vibrates briefly when a call is hung up, declined, or missed
   */
  async playCallEnd() {
    await this.stopAll();
    this.currentMode = 'end';
    try {
      Vibration.vibrate(200);
    } catch {}
  }

  /**
   * Stops all active vibrations
   */
  async stopAll() {
    try {
      Vibration.cancel();
    } catch {}
    this.currentMode = null;
  }
}

export const soundManager = new SoundManager();
