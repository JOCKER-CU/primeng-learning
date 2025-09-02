import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ScrollService, ScrollOptions } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-examples',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    SliderModule,
    FormsModule
  ],
  templateUrl: './scroll-examples.component.html',
  styleUrl: './scroll-examples.component.scss'
})
export class ScrollExamplesComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('contentContainer') contentContainer!: ElementRef;

  // Scroll options
  scrollOptions: ScrollOptions = {
    behavior: 'smooth',
    delay: 100
  };

  // Auto-scroll settings
  autoScrollEnabled = true;
  scrollThreshold = 100;
  scrollDelay = 100;

  // Content generation
  messages: Array<{ id: number; text: string; timestamp: Date; type: 'user' | 'assistant' }> = [];
  messageText = '';
  isGenerating = false;

  // Scroll position tracking
  currentScrollPosition = { top: 0, left: 0 };
  isNearBottom = true;

  // Behavior options
  behaviorOptions = [
    { label: 'Smooth', value: 'smooth' },
    { label: 'Instant', value: 'auto' }
  ];

  // Cleanup function for auto-scroll
  private autoScrollCleanup?: () => void;

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.generateInitialContent();
  }

  ngAfterViewInit() {
    this.setupAutoScroll();
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.autoScrollCleanup) {
      this.autoScrollCleanup();
    }
  }

  /**
   * Setup auto-scroll functionality
   */
  private setupAutoScroll(): void {
    if (this.chatContainer?.nativeElement) {
      this.autoScrollCleanup = this.scrollService.enableAutoScroll(
        this.chatContainer.nativeElement,
        this.scrollThreshold
      );
    }
  }

  /**
   * Generate initial content for demonstration
   */
  private generateInitialContent(): void {
    const initialMessages = [
      'Hello! Welcome to the scroll examples.',
      'This demonstrates ChatGPT-style auto-scrolling.',
      'Try scrolling up and then adding new messages.',
      'The container will auto-scroll if you\'re near the bottom.',
      'You can also manually control scrolling with the buttons below.'
    ];

    initialMessages.forEach((text, index) => {
      this.messages.push({
        id: index + 1,
        text,
        timestamp: new Date(Date.now() - (initialMessages.length - index) * 1000),
        type: 'assistant'
      });
    });
  }

  /**
   * Add a new message
   */
  addMessage(): void {
    if (!this.messageText.trim()) return;

    // Add user message
    this.messages.push({
      id: this.messages.length + 1,
      text: this.messageText,
      timestamp: new Date(),
      type: 'user'
    });

    this.messageText = '';

    // Simulate assistant response
    this.simulateAssistantResponse();
  }

  /**
   * Simulate assistant response with typing effect
   */
  private simulateAssistantResponse(): void {
    this.isGenerating = true;
    
    setTimeout(() => {
      const responses = [
        'That\'s an interesting point!',
        'I understand what you mean.',
        'Let me think about that for a moment.',
        'Here\'s what I think about that topic.',
        'That reminds me of something similar.',
        'Great question! Let me explain.',
        'I\'m glad you brought that up.',
        'That\'s a good observation.',
        'Let me elaborate on that.',
        'I see what you\'re getting at.'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      this.messages.push({
        id: this.messages.length + 1,
        text: randomResponse,
        timestamp: new Date(),
        type: 'assistant'
      });

      this.isGenerating = false;
      this.scrollToBottom();
    }, 1000 + Math.random() * 2000);
  }

  /**
   * Scroll to bottom of chat container
   */
  scrollToBottom(): void {
    if (this.chatContainer?.nativeElement) {
      this.scrollService.scrollToBottom(this.chatContainer.nativeElement, this.scrollOptions);
    }
  }

  /**
   * Scroll to top of chat container
   */
  scrollToTop(): void {
    if (this.chatContainer?.nativeElement) {
      this.scrollService.scrollToTop(this.chatContainer.nativeElement, this.scrollOptions);
    }
  }

  /**
   * Scroll to a specific message
   */
  scrollToMessage(messageId: number): void {
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement && this.chatContainer?.nativeElement) {
      this.scrollService.scrollToElement(
        messageElement,
        this.chatContainer.nativeElement,
        this.scrollOptions
      );
    }
  }

  /**
   * Scroll to a specific position
   */
  scrollToPosition(): void {
    if (this.contentContainer?.nativeElement) {
      this.scrollService.scrollToPosition(
        this.contentContainer.nativeElement,
        this.currentScrollPosition,
        this.scrollOptions
      );
    }
  }

  /**
   * Update scroll position tracking
   */
  updateScrollPosition(): void {
    if (this.chatContainer?.nativeElement) {
      this.currentScrollPosition = this.scrollService.getScrollPosition(this.chatContainer.nativeElement);
      this.isNearBottom = this.scrollService.isNearBottom(
        this.chatContainer.nativeElement,
        this.scrollThreshold
      );
    }
  }

  /**
   * Toggle auto-scroll functionality
   */
  toggleAutoScroll(): void {
    this.autoScrollEnabled = !this.autoScrollEnabled;
    
    if (this.autoScrollEnabled) {
      this.setupAutoScroll();
    } else if (this.autoScrollCleanup) {
      this.autoScrollCleanup();
    }
  }

  /**
   * Update scroll threshold
   */
  updateScrollThreshold(): void {
    if (this.autoScrollCleanup) {
      this.autoScrollCleanup();
    }
    this.setupAutoScroll();
  }

  /**
   * Add multiple messages for testing
   */
  addMultipleMessages(): void {
    const testMessages = [
      'This is a test message to demonstrate scrolling.',
      'Adding multiple messages to see the auto-scroll in action.',
      'The container should automatically scroll to the bottom.',
      'Unless you\'ve scrolled up to read previous messages.',
      'In that case, it will respect your scroll position.',
      'This is exactly how ChatGPT behaves!',
      'Try scrolling up and then adding more messages.',
      'You\'ll see the smart auto-scroll behavior.'
    ];

    testMessages.forEach((text, index) => {
      setTimeout(() => {
        this.messages.push({
          id: this.messages.length + 1,
          text,
          timestamp: new Date(),
          type: 'assistant'
        });
      }, index * 500);
    });
  }

  /**
   * Clear all messages
   */
  clearMessages(): void {
    this.messages = [];
    this.generateInitialContent();
    setTimeout(() => this.scrollToBottom(), 100);
  }

  /**
   * Handle scroll event
   */
  onScroll(): void {
    this.updateScrollPosition();
  }

  /**
   * Handle key press in message input
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.addMessage();
    }
  }
}
