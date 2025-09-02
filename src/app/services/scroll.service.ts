import { Injectable, NgZone } from '@angular/core';

export interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  smooth?: boolean;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private ngZone: NgZone) { }

  /**
   * Scroll to the bottom of an element smoothly
   * @param element - The element to scroll
   * @param options - Scroll options
   */
  scrollToBottom(
    element: HTMLElement | Element | null,
    options: ScrollOptions = {}
  ): void {
    if (!element) return;

    const defaultOptions: ScrollOptions = {
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
      smooth: true,
      delay: 100
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.ngZone.runOutsideAngular(() => {
      if (finalOptions.delay && finalOptions.delay > 0) {
        setTimeout(() => {
          this.performScroll(element, finalOptions);
        }, finalOptions.delay);
      } else {
        this.performScroll(element, finalOptions);
      }
    });
  }

  /**
   * Scroll to a specific element
   * @param targetElement - The element to scroll to
   * @param containerElement - The container to scroll within
   * @param options - Scroll options
   */
  scrollToElement(
    targetElement: HTMLElement | Element | null,
    containerElement: HTMLElement | Element | null = null,
    options: ScrollOptions = {}
  ): void {
    if (!targetElement) return;

    const defaultOptions: ScrollOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
      smooth: true
    };

    const finalOptions = { ...defaultOptions, ...options };
    const scrollContainer = containerElement || targetElement.parentElement;

    if (scrollContainer && targetElement instanceof HTMLElement && scrollContainer instanceof HTMLElement) {
      this.ngZone.runOutsideAngular(() => {
        scrollContainer.scrollTo({
          top: targetElement.offsetTop - scrollContainer.offsetTop,
          behavior: finalOptions.behavior || 'smooth'
        });
      });
    }
  }

  /**
   * Auto-scroll to bottom when new content is added (ChatGPT style)
   * @param containerElement - The container to monitor
   * @param scrollThreshold - Distance from bottom to trigger auto-scroll
   */
  enableAutoScroll(
    containerElement: HTMLElement | Element | null,
    scrollThreshold: number = 100
  ): () => void {
    if (!containerElement) return () => { };

    let isUserScrolling = false;
    let scrollTimeout: any;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      isUserScrolling = true;

      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 150);
    };

    const handleResize = () => {
      if (!isUserScrolling) {
        this.scrollToBottom(containerElement, { delay: 50 });
      }
    };

    const handleMutation = (mutations: MutationRecord[]) => {
      if (isUserScrolling) return;

      const hasNewContent = mutations.some(mutation =>
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );

      if (hasNewContent) {
        const isNearBottom = this.isNearBottom(containerElement, scrollThreshold);
        if (isNearBottom) {
          this.scrollToBottom(containerElement, { delay: 50 });
        }
      }
    };

    // Add event listeners
    containerElement.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Create mutation observer for content changes
    const observer = new MutationObserver(handleMutation);
    observer.observe(containerElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Return cleanup function
    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }

  /**
   * Check if the container is near the bottom
   * @param element - The element to check
   * @param threshold - Distance from bottom to consider "near"
   */
  isNearBottom(element: HTMLElement | Element | null, threshold: number = 100): boolean {
    if (!element || !(element instanceof HTMLElement)) return false;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    return (scrollTop + clientHeight + threshold) >= scrollHeight;
  }

  /**
   * Get current scroll position
   * @param element - The element to check
   */
  getScrollPosition(element: HTMLElement | Element | null): { top: number; left: number } {
    if (!element) return { top: 0, left: 0 };

    return {
      top: element.scrollTop,
      left: element.scrollLeft
    };
  }

  /**
   * Scroll to a specific position
   * @param element - The element to scroll
   * @param position - The position to scroll to
   * @param options - Scroll options
   */
  scrollToPosition(
    element: HTMLElement | Element | null,
    position: { top?: number; left?: number },
    options: ScrollOptions = {}
  ): void {
    if (!element) return;

    const defaultOptions: ScrollOptions = {
      behavior: 'smooth',
      smooth: true
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.ngZone.runOutsideAngular(() => {
      element.scrollTo({
        top: position.top,
        left: position.left,
        behavior: finalOptions.behavior || 'smooth'
      });
    });
  }

  /**
   * Scroll to top of an element
   * @param element - The element to scroll
   * @param options - Scroll options
   */
  scrollToTop(
    element: HTMLElement | Element | null,
    options: ScrollOptions = {}
  ): void {
    if (!element) return;

    const defaultOptions: ScrollOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      smooth: true
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.ngZone.runOutsideAngular(() => {
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: finalOptions.behavior || 'smooth'
      });
    });
  }

  /**
   * Perform the actual scroll operation
   * @param element - The element to scroll
   * @param options - Scroll options
   */
  private performScroll(element: HTMLElement | Element, options: ScrollOptions): void {
    if (options.block === 'end') {
      // Scroll to bottom
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
        behavior: options.behavior || 'smooth'
      });
    } else if (options.block === 'start') {
      // Scroll to top
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: options.behavior || 'smooth'
      });
    } else {
      // Use scrollIntoView for other positions
      element.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'nearest',
        inline: options.inline || 'nearest'
      });
    }
  }
}
