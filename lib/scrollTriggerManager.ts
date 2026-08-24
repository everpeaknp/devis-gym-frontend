import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global ScrollTrigger refresh manager
 * Prevents refresh loops by debouncing and limiting simultaneous calls
 */
class ScrollTriggerManager {
  private refreshTimeout: ReturnType<typeof setTimeout> | null = null;
  private isRefreshing = false;
  private pendingRefresh = false;
  private lastRefreshTime = 0;
  private minRefreshInterval = 250; // Minimum 250ms between refreshes

  /**
   * Debounced refresh - batches multiple refresh requests
   */
  debouncedRefresh(delay = 200): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.refreshTimeout = setTimeout(() => {
      this.refresh();
    }, delay);
  }

  /**
   * Immediate refresh with throttling
   */
  refresh(): void {
    const now = Date.now();
    const timeSinceLastRefresh = now - this.lastRefreshTime;

    // If we're currently refreshing or recently refreshed, queue it
    if (this.isRefreshing || timeSinceLastRefresh < this.minRefreshInterval) {
      this.pendingRefresh = true;
      
      // Schedule pending refresh after minimum interval
      if (!this.refreshTimeout) {
        const waitTime = Math.max(0, this.minRefreshInterval - timeSinceLastRefresh);
        this.refreshTimeout = setTimeout(() => {
          if (this.pendingRefresh) {
            this.refresh();
          }
        }, waitTime);
      }
      return;
    }

    // Perform the refresh
    this.isRefreshing = true;
    this.pendingRefresh = false;
    this.lastRefreshTime = now;

    try {
      ScrollTrigger.refresh();
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Cancel any pending refresh
   */
  cancel(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
    this.pendingRefresh = false;
  }

  /**
   * Reset the manager state
   */
  reset(): void {
    this.cancel();
    this.isRefreshing = false;
    this.lastRefreshTime = 0;
  }
}

// Global singleton instance
export const scrollTriggerManager = new ScrollTriggerManager();
