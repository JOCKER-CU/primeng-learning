import { Directive, ElementRef, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

export interface AutoScrollOptions {
  enabled?: boolean;
  threshold?: number;
  behavior?: ScrollBehavior;
  delay?: number;
}

@Directive({
  selector: '[appAutoScroll]',
  standalone: true
})
export class AutoScrollDirective implements OnInit, OnDestroy {
  
  @Input() appAutoScroll: AutoScrollOptions = {};
  @Input() autoScrollEnabled: boolean = true;
  @Input() scrollThreshold: number = 100;
  @Input() scrollBehavior: ScrollBehavior = 'smooth';
  @Input() scrollDelay: number = 100;

  private cleanup?: () => void;

  constructor(
    private elementRef: ElementRef,
    private scrollService: ScrollService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.setupAutoScroll();
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  private setupAutoScroll(): void {
    const options = {
      enabled: this.autoScrollEnabled,
      threshold: this.scrollThreshold,
      behavior: this.scrollBehavior,
      delay: this.scrollDelay,
      ...this.appAutoScroll
    };

    if (options.enabled !== false) {
      this.cleanup = this.scrollService.enableAutoScroll(
        this.elementRef.nativeElement,
        options.threshold || 100
      );
    }
  }

  /**
   * Manually scroll to bottom
   */
  scrollToBottom(): void {
    this.scrollService.scrollToBottom(this.elementRef.nativeElement, {
      behavior: this.scrollBehavior,
      delay: this.scrollDelay
    });
  }

  /**
   * Manually scroll to top
   */
  scrollToTop(): void {
    this.scrollService.scrollToTop(this.elementRef.nativeElement, {
      behavior: this.scrollBehavior,
      delay: this.scrollDelay
    });
  }

  /**
   * Check if element is near bottom
   */
  isNearBottom(): boolean {
    return this.scrollService.isNearBottom(
      this.elementRef.nativeElement,
      this.scrollThreshold
    );
  }

  /**
   * Get current scroll position
   */
  getScrollPosition(): { top: number; left: number } {
    return this.scrollService.getScrollPosition(this.elementRef.nativeElement);
  }
}
