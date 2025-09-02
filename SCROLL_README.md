# ChatGPT-Style Scroll Functionality for Angular PrimeNG

This project provides a comprehensive scroll solution that mimics ChatGPT's intelligent auto-scroll behavior. It includes a service, directive, and component examples that you can use in your Angular applications.

## 🚀 Features

- **Smart Auto-scroll**: Automatically scrolls to bottom when new content arrives, but only if user is near the bottom
- **User Intent Respect**: Won't force scroll if user has scrolled up to read previous content
- **Smooth Animations**: Configurable smooth scrolling with customizable delays
- **Position Tracking**: Real-time scroll position monitoring
- **Manual Controls**: Programmatic scroll to top, bottom, or specific elements
- **Configurable Behavior**: Adjustable thresholds, delays, and scroll behavior
- **Performance Optimized**: Uses NgZone and passive event listeners for optimal performance

## 📁 File Structure

```
src/app/
├── services/
│   └── scroll.service.ts          # Core scroll service
├── directives/
│   └── auto-scroll.directive.ts   # Reusable directive
└── components/
    └── scroll-examples/           # Example component
        ├── scroll-examples.component.ts
        ├── scroll-examples.component.html
        └── scroll-examples.component.scss
```

## 🛠️ Installation & Setup

### 1. Import the Scroll Service

```typescript
import { ScrollService } from './services/scroll.service';

@Component({
  // ... component config
  providers: [ScrollService]
})
export class YourComponent {
  constructor(private scrollService: ScrollService) {}
}
```

### 2. Basic Usage

#### Scroll to Bottom
```typescript
// Simple scroll to bottom
this.scrollService.scrollToBottom(element);

// With custom options
this.scrollService.scrollToBottom(element, {
  behavior: 'smooth',
  delay: 200
});
```

#### Scroll to Top
```typescript
this.scrollService.scrollToTop(element);
```

#### Scroll to Specific Element
```typescript
this.scrollService.scrollToElement(targetElement, containerElement);
```

### 3. Enable Auto-Scroll (ChatGPT Style)

```typescript
ngAfterViewInit() {
  // Enable auto-scroll with cleanup function
  this.cleanup = this.scrollService.enableAutoScroll(
    this.chatContainer.nativeElement,
    100 // threshold in pixels
  );
}

ngOnDestroy() {
  if (this.cleanup) {
    this.cleanup();
  }
}
```

## 🎯 Using the Directive

The `AutoScrollDirective` provides an easy way to add auto-scroll functionality to any element:

### Basic Usage
```html
<div appAutoScroll class="chat-container">
  <!-- Your chat messages here -->
</div>
```

### With Custom Options
```html
<div 
  appAutoScroll 
  [autoScrollEnabled]="true"
  [scrollThreshold]="150"
  [scrollBehavior]="'smooth'"
  [scrollDelay]="200"
  class="chat-container">
  <!-- Your content here -->
</div>
```

### Programmatic Control
```typescript
@ViewChild(AutoScrollDirective) autoScroll!: AutoScrollDirective;

// Scroll to bottom
this.autoScroll.scrollToBottom();

// Check if near bottom
const isNearBottom = this.autoScroll.isNearBottom();

// Get scroll position
const position = this.autoScroll.getScrollPosition();
```

## ⚙️ Configuration Options

### ScrollService Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `scrollToBottom()` | Scroll to bottom of element | `element`, `options?` |
| `scrollToTop()` | Scroll to top of element | `element`, `options?` |
| `scrollToElement()` | Scroll to specific element | `targetElement`, `containerElement?`, `options?` |
| `scrollToPosition()` | Scroll to specific position | `element`, `position`, `options?` |
| `enableAutoScroll()` | Enable ChatGPT-style auto-scroll | `element`, `threshold?` |
| `isNearBottom()` | Check if near bottom | `element`, `threshold?` |
| `getScrollPosition()` | Get current scroll position | `element` |

### Scroll Options

```typescript
interface ScrollOptions {
  behavior?: ScrollBehavior;    // 'auto' | 'smooth'
  block?: ScrollLogicalPosition; // 'start' | 'center' | 'end' | 'nearest'
  inline?: ScrollLogicalPosition; // 'start' | 'center' | 'end' | 'nearest'
  smooth?: boolean;             // Legacy smooth scrolling
  delay?: number;               // Delay before scrolling (ms)
}
```

### Auto-Scroll Threshold

The threshold determines when auto-scroll should trigger:
- **Low threshold (50px)**: More aggressive auto-scroll
- **High threshold (200px)**: Less aggressive, respects user scroll position more

## 🔧 Advanced Usage

### Custom Auto-Scroll Logic

```typescript
// Monitor content changes manually
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check if user is near bottom
      if (this.scrollService.isNearBottom(this.container, 100)) {
        this.scrollService.scrollToBottom(this.container);
      }
    }
  });
});

observer.observe(this.container, {
  childList: true,
  subtree: true
});
```

### Scroll Position Tracking

```typescript
// Track scroll position changes
@HostListener('scroll', ['$event'])
onScroll(event: any) {
  const position = this.scrollService.getScrollPosition(event.target);
  const isNearBottom = this.scrollService.isNearBottom(event.target, 100);
  
  console.log('Scroll position:', position);
  console.log('Near bottom:', isNearBottom);
}
```

### Performance Optimization

```typescript
// Use runOutsideAngular for better performance
this.ngZone.runOutsideAngular(() => {
  this.scrollService.scrollToBottom(element, { delay: 100 });
});
```

## 🎨 Styling

### Custom Scrollbar Styling

```scss
.chat-container {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }
}
```

### Responsive Design

```scss
@media (max-width: 768px) {
  .chat-container {
    height: 400px; // Smaller height on mobile
  }
  
  .message {
    max-width: 90%; // Wider messages on mobile
  }
}
```

## 🧪 Testing

### Unit Tests

```typescript
describe('ScrollService', () => {
  let service: ScrollService;
  let mockElement: HTMLElement;

  beforeEach(() => {
    service = new ScrollService(mockNgZone);
    mockElement = document.createElement('div');
  });

  it('should scroll to bottom', () => {
    spyOn(mockElement, 'scrollTo');
    service.scrollToBottom(mockElement);
    expect(mockElement.scrollTo).toHaveBeenCalled();
  });
});
```

### E2E Tests

```typescript
it('should auto-scroll when new message is added', () => {
  // Add message
  cy.get('[data-cy="message-input"]').type('Test message');
  cy.get('[data-cy="send-button"]').click();
  
  // Check if scrolled to bottom
  cy.get('[data-cy="chat-container"]').should('have.prop', 'scrollTop', 0);
});
```

## 🚨 Common Issues & Solutions

### Issue: Auto-scroll not working
**Solution**: Ensure the element has a fixed height and `overflow-y: auto`

### Issue: Scroll position jumping
**Solution**: Use appropriate delay and check for user scroll intent

### Issue: Performance issues with large content
**Solution**: Use `runOutsideAngular` and implement virtual scrolling for very long lists

### Issue: Mobile scroll behavior
**Solution**: Test on mobile devices and adjust thresholds accordingly

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 11 (limited support)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by ChatGPT's intelligent scroll behavior
- Built with Angular 17 and PrimeNG
- Uses modern web APIs for optimal performance

---

For more examples and advanced usage, check out the `scroll-examples` component in this project!
