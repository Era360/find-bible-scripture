# [Find Bible Scripture](https://find-bible-scripture.netlify.app/)

## Revolutionary AI-Powered Biblical Search

Transform the way you discover Scripture by simply describing biblical stories, parables, or situations in your own words. Our advanced AI technology instantly finds the corresponding Bible verses with full references and text.

### ✨ Key Features

- **Natural Language Search**: Describe biblical events in your own words
- **Instant Results**: Get Scripture references and full text in seconds
- **AI-Powered**: Advanced technology for accurate biblical connections
- **User-Friendly**: Intuitive interface designed for all users
- **Mobile Responsive**: Access anywhere, anytime on any device

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Era360/find-bible-scripture.git
   cd find-bible-scripture
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Configure Firebase**

   - Create a new project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Google provider
   - Set up Firestore database
   - Copy your configuration details to the `.env.local` file

5. **Get OpenAI API Key**

   - Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 🛠️ Built With

- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Firebase** - Backend services and authentication
- **OpenAI API** - AI-powered search functionality
- **Microsoft Fluent UI** - Design system for consistent UX

## 📱 Usage

1. **Sign in** with your Google account
2. **Describe** a biblical story, parable, or situation
3. **Get instant results** with Scripture references and full text
4. **Copy** verses or references with one click
5. **View history** of your previous searches

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on how to get started.

### Ways to Contribute

- 🐛 Report bugs and issues
- ✨ Suggest new features
- 💻 Submit code improvements
- 📖 Improve documentation
- 🎨 Enhance UI/UX design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- OpenAI for providing the AI technology that powers our search
- Firebase for reliable backend services
- The open-source community for amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on [GitHub](https://github.com/Era360/find-bible-scripture/issues)
- Contact our support team
- Check our documentation

---

**Made with ❤️ for the global Christian community**
