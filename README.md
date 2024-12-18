# Password Strength Checker

This is a simple password strength checker that evaluates the strength of a password using [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) and the [Pwned Passwords API](https://haveibeenpwned.com/API/v3). It checks against common dictionary words, breached passwords, entropy, and more.

The purpose of this tool is to demonstrate that enforcing strict complexity requirements (such as uppercase letters, symbols, etc.) does not necessarily result in a strong password and can give a false sense of security. For more information, you can read my [article](https://blog.emmanuelisenah.com) exploring this topic.

## Getting Started

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Learn More

To learn more about the libraries and APIs used in this project, check out the following resources:

- [zxcvbn-ts Documentation](https://github.com/zxcvbn-ts/zxcvbn)
- [Pwned Passwords API Documentation](https://haveibeenpwned.com/API/v3)
