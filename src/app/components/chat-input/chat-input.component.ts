import { Component, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TooltipModule } from 'primeng/tooltip';

interface ChatMessage {
  text: string;
  time: Date;
  type: 'sent' | 'received';
  files?: File[];
}

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextareaModule,
    ButtonModule,
    ScrollTopModule,
    TooltipModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  message: string = '';
  uploadedFiles: File[] = [];
  messages: ChatMessage[] = [];
  isVoiceActive: boolean = false;
  shouldScrollToBottom = true;
  isDarkTheme = false;
  showScrollIndicator = false;
  scrollIndicatorPulse = false;

  constructor(private cdr: ChangeDetectorRef) {
    // Check for saved theme preference
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();

    // Add some sample messages to demonstrate scroll functionality
    this.messages = [
      {
        text: 'Hello! Welcome to the PrimeNG Chat Input demo.',
        time: new Date(Date.now() - 300000),
        type: 'received'
      },
      {
        text: 'You can send messages and upload files here.',
        time: new Date(Date.now() - 240000),
        type: 'received'
      },
      {
        text: 'Try typing a message and pressing Enter to send it!',
        time: new Date(Date.now() - 180000),
        type: 'received'
      },
      {
        text: 'This chat demonstrates the ChatGPT-style scroll-to-bottom functionality.',
        time: new Date(Date.now() - 120000),
        type: 'received'
      },
      {
        text: 'When you scroll up to read previous messages, a scroll indicator will appear.',
        time: new Date(Date.now() - 60000),
        type: 'received'
      },
      {
        text: 'Click the arrow button to quickly return to the bottom of the conversation.',
        time: new Date(Date.now() - 30000),
        type: 'received'
      },
      {
        text: 'The button will pulse when new messages arrive if you\'re not at the bottom.',
        time: new Date(Date.now() - 15000),
        type: 'received'
      }
    ];
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  private isNearBottom(): boolean {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        const threshold = 150; // pixels from bottom - increased for better UX
        return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
      }
      return true;
    } catch (err) {
      return true;
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  sendMessage(event?: Event) {
    if (event && event instanceof KeyboardEvent && !event.shiftKey) {
      event.preventDefault();
    }

    if (this.message.trim() || this.uploadedFiles.length > 0) {
      const newMessage: ChatMessage = {
        text: this.message.trim(),
        time: new Date(),
        type: 'sent',
        files: this.uploadedFiles.length > 0 ? [...this.uploadedFiles] : undefined
      };

      this.messages.push(newMessage);
      this.message = '';
      this.uploadedFiles = [];

      // Check if user is near bottom to determine if we should auto-scroll
      this.shouldScrollToBottom = this.isNearBottom();

      // Show scroll indicator if not at bottom
      if (!this.shouldScrollToBottom) {
        this.showScrollIndicator = true;
        this.triggerScrollPulse();
      }

      // Simulate a response after 1 second
      setTimeout(() => {
        this.messages.push({
          text: this.getRandomResponse(),
          time: new Date(),
          type: 'received'
        });

        // Check scroll position again for the response
        this.shouldScrollToBottom = this.isNearBottom();
        if (!this.shouldScrollToBottom) {
          this.showScrollIndicator = true;
          this.triggerScrollPulse();
        }

        this.cdr.detectChanges();
      }, 1000);
    }
  }

  private triggerScrollPulse() {
    this.scrollIndicatorPulse = true;
    setTimeout(() => {
      this.scrollIndicatorPulse = false;
    }, 2000);
  }

  private getRandomResponse(): string {
    const responses = [
      'Message received! Thanks for using PrimeNG Chat Input.',
      'Great! I got your message.',
      'Thanks for sharing that with me!',
      'I appreciate your input!',
      'Got it! Anything else you\'d like to share?',
      'Message delivered successfully!',
      'Thanks for the update!',
      'I\'m here to help with any questions!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log('Uploaded files:', this.uploadedFiles);
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  clearAllFiles() {
    this.uploadedFiles = [];
  }

  getImagePreview(file: File): string {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return '';
  }

  toggleVoiceInput() {
    this.isVoiceActive = !this.isVoiceActive;
    if (this.isVoiceActive) {
      console.log('Voice input activated');
      // Here you would implement voice recording functionality
    } else {
      console.log('Voice input deactivated');
      // Here you would stop voice recording
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Method to manually scroll to bottom (useful for testing)
  scrollToBottomManually() {
    this.shouldScrollToBottom = true;
    this.showScrollIndicator = false;
    this.scrollToBottom();
  }

  // Method to check scroll position
  onScroll() {
    const wasNearBottom = this.shouldScrollToBottom;
    this.shouldScrollToBottom = this.isNearBottom();

    // Show/hide scroll indicator based on scroll position
    if (!this.shouldScrollToBottom && !this.showScrollIndicator) {
      this.showScrollIndicator = true;
    } else if (this.shouldScrollToBottom && this.showScrollIndicator) {
      this.showScrollIndicator = false;
    }

    // If user scrolled back to bottom, hide the indicator
    if (wasNearBottom !== this.shouldScrollToBottom && this.shouldScrollToBottom) {
      this.showScrollIndicator = false;
    }
  }

  // TrackBy function for better performance
  trackByMessage(index: number, message: ChatMessage): string {
    return `${message.time.getTime()}-${message.text}`;
  }
}
