// Centralized mapping for activity types, labels, and icons
// Update this file to change labels/icons everywhere

export const ACTIVITY_TYPE_MAP = {
  CLOUD_USAGE: {
    label: 'Cloud Computing Usage',
    icon: '☁️',
  },
  CICD_USAGE: {
    label: 'CI/CD Pipeline Usage',
    icon: '🔧',
  },
  EMAIL_USAGE: {
    label: 'Email Usage',
    icon: '📧',
  },
  DIGITAL_STORAGE: {
    label: 'Digital Storage',
    icon: '💾',
  },
  VIDEO_STREAMING: {
    label: 'Video Streaming',
    icon: '📺',
  },
  WEB_BROWSING: {
    label: 'Web Browsing',
    icon: '🌐',
  },
  SOCIAL_MEDIA: {
    label: 'Social Media',
    icon: '📱',
  },
  ONLINE_MEETING: {
    label: 'Online Meeting',
    icon: '📹',
  },
  OTHER: {
    label: 'Other Digital Activity',
    icon: '�',
  },
};

export function getActivityLabel(type) {
  return ACTIVITY_TYPE_MAP[type]?.label || type;
}

export function getActivityIcon(type) {
  return ACTIVITY_TYPE_MAP[type]?.icon || '📱';
}
