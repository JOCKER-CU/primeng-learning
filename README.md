# PrimeNG Learning Project

A comprehensive Angular application demonstrating various PrimeNG components and advanced features. This project serves as a learning resource for Angular developers who want to explore PrimeNG's rich component library and implement modern UI patterns.

## 🚀 Features

### Component Examples
- **Button Examples** (`/buttons`) - Various button types, styles, and interactions
- **Input Examples** (`/inputs`) - Form inputs, validation, and user input handling
- **Data Table Examples** (`/data-table`) - Advanced data tables with sorting, filtering, and pagination
- **Dialog Examples** (`/dialogs`) - Modal dialogs, confirmations, and overlay components
- **Chat Input** (`/chat-input`) - Rich text editor with Quill integration
- **Toast Examples** (`/toast`) - Notification system and user feedback
- **Scroll Examples** (`/scroll`) - ChatGPT-style intelligent auto-scroll functionality
- **Form Examples** (`/form`) - Comprehensive form implementations with validation

### Advanced Features
- **Smart Auto-Scroll**: ChatGPT-style scroll behavior that respects user intent
- **Form Validation**: Both template-driven and reactive forms with comprehensive validation
- **Rich Text Editing**: Quill editor integration for chat input
- **Responsive Design**: Mobile-first approach with modern CSS Grid layouts
- **Theme Support**: Compatible with PrimeNG themes and custom styling

## 🛠️ Technology Stack

- **Angular 17.3.0** - Latest Angular framework
- **PrimeNG 17.13.0** - Rich UI component library
- **PrimeIcons 7.0.0** - Icon library
- **Quill 2.0.3** - Rich text editor
- **TypeScript 5.4.2** - Type-safe JavaScript
- **RxJS 7.8.0** - Reactive programming

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd primeng-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🎯 Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Button Examples | Default route - Button component demos |
| `/buttons` | Button Examples | Various button types and interactions |
| `/inputs` | Input Examples | Form inputs and validation examples |
| `/data-table` | Data Table Examples | Advanced data table features |
| `/dialogs` | Dialog Examples | Modal dialogs and overlays |
| `/chat-input` | Chat Input | Rich text editor with Quill |
| `/toast` | Toast Examples | Notification system demos |
| `/scroll` | Scroll Examples | Smart auto-scroll functionality |
| `/form` | Form Examples | Comprehensive form implementations |

## 🎨 Key Components Demonstrated

### Form Components
- `p-inputtext` - Text inputs with validation
- `p-inputtextarea` - Multi-line text inputs
- `p-inputnumber` - Numeric inputs
- `p-calendar` - Date picker with custom formatting
- `p-dropdown` - Single selection dropdowns
- `p-multiselect` - Multiple selection components
- `p-checkbox` - Checkbox inputs
- `p-radiobutton` - Radio button groups
- `p-slider` - Range sliders
- `p-rating` - Star rating components
- `p-password` - Password inputs with toggle
- `p-fileupload` - File upload components

### Data Display
- `p-table` - Advanced data tables
- `p-card` - Content containers
- `p-message` - Validation and status messages
- `p-toast` - Notification system

### Navigation & Interaction
- `p-button` - Various button types and styles
- `p-dialog` - Modal dialogs
- `p-confirmdialog` - Confirmation dialogs
- `p-overlaypanel` - Overlay panels

## 🔧 Development Commands

```bash
# Development server
ng serve

# Build for production
ng build

# Build with watch mode
ng build --watch --configuration development

# Run unit tests
ng test

# Generate new component
ng generate component component-name

# Generate other Angular artifacts
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 📚 Documentation

### Form Examples
Comprehensive form implementations with both template-driven and reactive approaches. Features include:
- Real-time validation with custom validators
- Password confirmation matching
- Form state monitoring (valid, dirty, touched)
- Responsive design with CSS Grid
- Accessibility features

See [FORM_EXAMPLES_README.md](./FORM_EXAMPLES_README.md) for detailed documentation.

### Scroll Functionality
ChatGPT-style intelligent auto-scroll that:
- Automatically scrolls to bottom when new content arrives
- Respects user scroll intent (won't force scroll if user scrolled up)
- Provides smooth animations and configurable behavior
- Includes reusable service and directive

See [SCROLL_README.md](./SCROLL_README.md) for detailed documentation.

## 🎯 Learning Objectives

This project demonstrates:

1. **PrimeNG Integration** - How to properly integrate and use PrimeNG components
2. **Form Handling** - Both template-driven and reactive form patterns
3. **Validation** - Built-in and custom validation strategies
4. **Responsive Design** - Mobile-first CSS Grid layouts
5. **Advanced UI Patterns** - Smart scrolling, rich text editing, and notifications
6. **Angular Best Practices** - Component architecture, services, and directives
7. **TypeScript** - Type-safe development with interfaces and models

## 🚀 Getting Started

1. **Explore the Components**: Start with the button examples to understand basic PrimeNG usage
2. **Study Form Patterns**: Check out the form examples for validation and user input handling
3. **Learn Advanced Features**: Explore the scroll functionality and chat input components
4. **Customize and Extend**: Use the examples as templates for your own applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Angular](https://angular.io/) - The web application framework
- [PrimeNG](https://primeng.org/) - The rich UI component library
- [PrimeIcons](https://primeng.org/icons) - The icon library
- [Quill](https://quilljs.com/) - The rich text editor

## 📞 Support

For questions and support:
- Check the [Angular Documentation](https://angular.io/docs)
- Visit the [PrimeNG Documentation](https://primeng.org/)
- Review the component-specific README files in this project

---

**Happy Learning! 🎉**
