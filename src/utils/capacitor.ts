import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform();

// Initialize Capacitor plugins - only runs on native platforms
export const initCapacitor = async () => {
  // Only initialize on native platforms, not on web
  if (!isNative) {
    return;
  }

  try {
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#2D7A4F' });

    // Handle keyboard
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    
    // Handle app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    // Handle back button (Android)
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  } catch (error) {
    console.warn('Capacitor initialization error:', error);
  }
};

// Haptic feedback helper - safe to call on web (does nothing)
export const hapticFeedback = async (style: ImpactStyle = ImpactStyle.Medium) => {
  if (isNative) {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.warn('Haptic feedback error:', error);
    }
  }
};

// Share functionality - works on both web and native
export const shareContent = async (title: string, text: string, url?: string) => {
  if (isNative) {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title,
        text,
        url,
        dialogTitle: 'Share via',
      });
    } catch (error) {
      console.warn('Share error:', error);
    }
  } else {
    // Fallback for web
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.warn('Web share error:', error);
      }
    }
  }
};

