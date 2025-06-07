import React, { useState, useCallback, useEffect } from "react";

class AudioEngine {
  constructor() {
    if (AudioEngine.instance) return AudioEngine.instance;

    this.sounds = { hover: null, click: null, background: null };
    this.isBackgroundPlaying = false;
    this.isInitialized = false;
    this.lastHoverTime = 0;
    this.subscribers = new Set();
    this.cleanupHandlers = [];

    this.paths = {
      hover: "/sounds/process.mp3",
      click: "/sounds/click.mp3",
    };

    this.initOnInteraction();
    AudioEngine.instance = this;
  }

  initOnInteraction() {
    const handleInteraction = () => {
      this.preloadSounds();
      this.cleanupHandlers.forEach((cleanup) => cleanup());
      this.cleanupHandlers = [];
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      const handler = () => handleInteraction();
      document.addEventListener(event, handler, { once: true, passive: true });
      this.cleanupHandlers.push(() =>
        document.removeEventListener(event, handler),
      );
    });
  }

  preloadSounds() {
    if (this.isInitialized) return;

    Object.entries(this.paths).forEach(([key, path]) => {
      try {
        const audio = new Audio(path);
        audio.preload = "auto";
        audio.volume =
          key === "background" ? 0.1 : key === "hover" ? 0.03 : 0.3;

        if (key === "background") {
          audio.loop = true;
        }

        const errorHandler = () => {
          this.sounds[key] = null;
          audio.removeEventListener("error", errorHandler);
        };
        audio.addEventListener("error", errorHandler);
        this.sounds[key] = audio;
      } catch {
        this.sounds[key] = null;
      }
    });

    this.isInitialized = true;
  }

  playHover() {
    if (!this.isInitialized || !this.sounds.hover) return;

    const now = performance.now();
    if (now - this.lastHoverTime < 150) return;

    this.lastHoverTime = now;
    this.sounds.hover.currentTime = 0;
    this.sounds.hover.play().catch(() => {});
  }

  playClick() {
    if (!this.isInitialized || !this.sounds.click) return;

    this.sounds.click.currentTime = 0;
    this.sounds.click.play().catch(() => {});
  }

  toggleBackground() {
    if (!this.isInitialized || !this.sounds.background)
      return this.isBackgroundPlaying;

    const audio = this.sounds.background;

    if (this.isBackgroundPlaying) {
      audio.pause();
      audio.currentTime = 0;
      this.isBackgroundPlaying = false;
    } else {
      audio.play().catch(() => {});
      this.isBackgroundPlaying = true;
    }

    this.notifySubscribers();
    return this.isBackgroundPlaying;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.isBackgroundPlaying));
  }

  getBackgroundState() {
    return this.isBackgroundPlaying;
  }

  setVolume(type, volume) {
    if (this.sounds[type]) {
      this.sounds[type].volume = Math.max(0, Math.min(1, volume));
    }
  }

  // Cleanup method for proper resource management
  destroy() {
    this.cleanupHandlers.forEach((cleanup) => cleanup());
    this.cleanupHandlers = [];

    Object.values(this.sounds).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    });

    this.sounds = { hover: null, click: null, background: null };
    this.subscribers.clear();
    this.isInitialized = false;
    AudioEngine.instance = null;
  }
}

const audioEngine = new AudioEngine();

const SoundWrapper = React.memo(
  ({
    children,
    playHover = true,
    playClick = true,
    onClick,
    onMouseEnter,
    className = "",
    disabled = false,
    as: Component = "div",
    role,
    tabIndex,
    ...props
  }) => {
    const handleMouseEnter = useCallback(
      (e) => {
        if (!disabled && playHover) audioEngine.playHover();
        onMouseEnter?.(e);
      },
      [disabled, playHover, onMouseEnter],
    );

    const handleClick = useCallback(
      (e) => {
        if (!disabled) {
          if (playClick) audioEngine.playClick();
          onClick?.(e);
        }
      },
      [disabled, playClick, onClick],
    );

    const handleTouchStart = useCallback(() => {
      if (!disabled && playHover) audioEngine.playHover();
    }, [disabled, playHover]);

    const handleKeyDown = useCallback(
      (e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if (playClick) audioEngine.playClick();
          onClick?.(e);
        }
      },
      [disabled, playClick, onClick],
    );

    return (
      <Component
        className={className}
        onMouseEnter={handleMouseEnter}
        onClick={disabled ? undefined : handleClick}
        onTouchStart={disabled ? undefined : handleTouchStart}
        onKeyDown={disabled ? undefined : handleKeyDown}
        role={role || (onClick ? "button" : undefined)}
        tabIndex={tabIndex ?? (onClick && !disabled ? 0 : undefined)}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

SoundWrapper.displayName = "SoundWrapper";

const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(() =>
    audioEngine.getBackgroundState(),
  );

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(setIsPlaying);
    return unsubscribe;
  }, []);

  const toggle = useCallback(() => {
    return audioEngine.toggleBackground();
  }, []);

  return { isPlaying, toggle };
};

export { AudioEngine, SoundWrapper, useBackgroundMusic };
export default audioEngine;
