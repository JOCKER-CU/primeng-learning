import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    description: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
}

@Component({
    selector: 'app-carousel-examples',
    standalone: true,
    imports: [
        CommonModule,
        CarouselModule,
        CardModule,
        ButtonModule,
        TagModule,
        FormsModule,
        CheckboxModule,
        SliderModule
    ],
    templateUrl: './carousel-examples.component.html',
    styleUrl: './carousel-examples.component.scss'
})
export class CarouselExamplesComponent {
    // Carousel settings
    autoplayInterval = 3000;
    numVisible = 3;
    numScroll = 1;
    circular: boolean = true;
    showIndicators: boolean = true;
    showNavigators: boolean = true;
    verticalViewPortHeight = '300px';
    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    // Product data
    products: Product[] = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 199.99,
            image: 'https://picsum.photos/seed/headphones/300/200',
            category: 'Audio',
            rating: 4.5,
            description: 'High-quality wireless headphones with noise cancellation'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 299.99,
            image: 'https://picsum.photos/seed/smartwatch/300/200',
            category: 'Wearables',
            rating: 4.8,
            description: 'Advanced smartwatch with health monitoring features'
        },
        {
            id: 3,
            name: 'Gaming Keyboard',
            price: 149.99,
            image: 'https://picsum.photos/seed/keyboard/300/200',
            category: 'Gaming',
            rating: 4.6,
            description: 'Mechanical gaming keyboard with RGB lighting'
        },
        {
            id: 4,
            name: 'Bluetooth Speaker',
            price: 89.99,
            image: 'https://picsum.photos/seed/speaker/300/200',
            category: 'Audio',
            rating: 4.3,
            description: 'Portable Bluetooth speaker with excellent sound quality'
        },
        {
            id: 5,
            name: 'Wireless Mouse',
            price: 79.99,
            image: 'https://picsum.photos/seed/mouse/300/200',
            category: 'Accessories',
            rating: 4.4,
            description: 'Ergonomic wireless mouse for productivity'
        },
        {
            id: 6,
            name: 'USB-C Hub',
            price: 59.99,
            image: 'https://picsum.photos/seed/hub/300/200',
            category: 'Accessories',
            rating: 4.2,
            description: 'Multi-port USB-C hub for laptops and tablets'
        }
    ];

    // Testimonial data
    testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Product Manager',
            company: 'TechCorp',
            content: 'This product has completely transformed our workflow. The quality and reliability are outstanding.',
            avatar: 'https://picsum.photos/seed/sarah/100/100',
            rating: 5
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Software Engineer',
            company: 'InnovateLab',
            content: 'Excellent customer service and a product that delivers on its promises. Highly recommended!',
            avatar: 'https://picsum.photos/seed/michael/100/100',
            rating: 5
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Design Director',
            company: 'CreativeStudio',
            content: 'The attention to detail and user experience is remarkable. This is exactly what we needed.',
            avatar: 'https://picsum.photos/seed/emily/100/100',
            rating: 4
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'CEO',
            company: 'StartupXYZ',
            content: 'Outstanding performance and value. This has been a game-changer for our business operations.',
            avatar: 'https://picsum.photos/seed/david/100/100',
            rating: 5
        },
        {
            id: 5,
            name: 'Lisa Wang',
            role: 'Marketing Manager',
            company: 'GrowthCo',
            content: 'Professional, efficient, and exactly what we were looking for. The results speak for themselves.',
            avatar: 'https://picsum.photos/seed/lisa/100/100',
            rating: 4
        }
    ];

    // Image gallery data
    galleryImages = [
        { src: 'https://picsum.photos/seed/gallery1/400/300', alt: 'Nature Landscape 1' },
        { src: 'https://picsum.photos/seed/gallery2/400/300', alt: 'Nature Landscape 2' },
        { src: 'https://picsum.photos/seed/gallery3/400/300', alt: 'Nature Landscape 3' },
        { src: 'https://picsum.photos/seed/gallery4/400/300', alt: 'Nature Landscape 4' },
        { src: 'https://picsum.photos/seed/gallery5/400/300', alt: 'Nature Landscape 5' },
        { src: 'https://picsum.photos/seed/gallery6/400/300', alt: 'Nature Landscape 6' }
    ];

    // News/Blog data
    newsItems = [
        {
            id: 1,
            title: 'Latest Technology Trends in 2024',
            excerpt: 'Discover the most exciting technological advancements shaping our future.',
            image: 'https://picsum.photos/seed/tech1/400/250',
            date: '2024-01-15',
            category: 'Technology'
        },
        {
            id: 2,
            title: 'Sustainable Development Goals',
            excerpt: 'How technology is helping achieve global sustainability objectives.',
            image: 'https://picsum.photos/seed/tech2/400/250',
            date: '2024-01-12',
            category: 'Sustainability'
        },
        {
            id: 3,
            title: 'AI and Machine Learning Revolution',
            excerpt: 'Exploring the impact of artificial intelligence on modern businesses.',
            image: 'https://picsum.photos/seed/tech3/400/250',
            date: '2024-01-10',
            category: 'AI/ML'
        },
        {
            id: 4,
            title: 'Cybersecurity Best Practices',
            excerpt: 'Essential security measures to protect your digital assets.',
            image: 'https://picsum.photos/seed/tech4/400/250',
            date: '2024-01-08',
            category: 'Security'
        }
    ];

    // Methods
    onProductSelect(product: Product) {
        console.log('Selected product:', product);
    }

    onTestimonialSelect(testimonial: Testimonial) {
        console.log('Selected testimonial:', testimonial);
    }

    onImageSelect(image: any) {
        console.log('Selected image:', image);
    }

    onNewsSelect(news: any) {
        console.log('Selected news:', news);
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    getEmptyStars(rating: number): number[] {
        return Array(5 - Math.floor(rating)).fill(0);
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        if (target) {
            target.src = 'https://via.placeholder.com/300x200?text=Image+Unavailable';
        }
    }
}
