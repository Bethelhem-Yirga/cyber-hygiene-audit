// src/data/questions.js
export const questions = [
  {
    id: 1,
    category: 'passwords',
    text: 'How do you manage your passwords?',
    options: [
      { text: 'I use a password manager for all accounts', value: 10 },
      { text: 'I use a password manager for some accounts', value: 5 },
      { text: 'I remember them or write them down', value: 0 }
    ]
  },
  {
    id: 2,
    category: 'passwords',
    text: 'Do you reuse passwords across multiple sites?',
    options: [
      { text: 'Never - every account has a unique password', value: 10 },
      { text: 'Sometimes - I reuse for less important sites', value: 5 },
      { text: 'Yes - I use the same password everywhere', value: 0 }
    ]
  },
  {
    id: 3,
    category: '2fa',
    text: 'Is Two-Factor Authentication (2FA) enabled on your email?',
    options: [
      { text: 'Yes, it\'s enabled', value: 10 },
      { text: 'No, but I plan to set it up', value: 3 },
      { text: 'No, and I\'m not sure what 2FA is', value: 0 }
    ]
  },
  {
    id: 4,
    category: '2fa',
    text: 'How many of your online accounts have 2FA enabled?',
    options: [
      { text: 'Most of my important accounts', value: 10 },
      { text: 'Only a few', value: 5 },
      { text: 'None', value: 0 }
    ]
  },
  {
    id: 5,
    category: 'updates',
    text: 'How do you handle software updates?',
    options: [
      { text: 'Automatic updates enabled everywhere', value: 10 },
      { text: 'I update manually when I remember', value: 5 },
      { text: 'I avoid updating unless necessary', value: 0 }
    ]
  },
  {
    id: 6,
    category: 'updates',
    text: 'When was the last time you updated your phone\'s operating system?',
    options: [
      { text: 'Within the last month', value: 10 },
      { text: 'Within the last 3-6 months', value: 5 },
      { text: 'More than 6 months ago / Never', value: 0 }
    ]
  },
  {
    id: 7,
    category: 'backups',
    text: 'Do you regularly back up your important files?',
    options: [
      { text: 'Yes, automated backups to cloud/external drive', value: 10 },
      { text: 'I back up occasionally', value: 5 },
      { text: 'No backups', value: 0 }
    ]
  },
  {
    id: 8,
    category: 'phishing',
    text: 'How confident are you in identifying phishing emails?',
    options: [
      { text: 'Very confident - I can spot them easily', value: 10 },
      { text: 'Somewhat confident - but I might fall for clever ones', value: 5 },
      { text: 'Not confident - I often click without checking', value: 0 }
    ]
  },
  {
    id: 9,
    category: 'wifi',
    text: 'How do you connect to public Wi-Fi?',
    options: [
      { text: 'I always use a VPN', value: 10 },
      { text: 'I\'m careful but don\'t use VPN', value: 5 },
      { text: 'I connect to any open network', value: 0 }
    ]
  },
  {
    id: 10,
    category: 'privacy',
    text: 'How often do you review app permissions on your phone?',
    options: [
      { text: 'Regularly - I check and revoke unnecessary permissions', value: 10 },
      { text: 'Occasionally - when I notice something', value: 5 },
      { text: 'Never - I just accept all permissions', value: 0 }
    ]
  }
];