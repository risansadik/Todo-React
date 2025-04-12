export function formatRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    
    // Convert milliseconds to seconds
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 5) {
      return "just now";
    } else if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h ago`;
    } else if (seconds < 604800) {
      return `${Math.floor(seconds / 86400)}d ago`;
    } else if (seconds < 2592000) {
      return `${Math.floor(seconds / 604800)}w ago`;
    } else if (seconds < 31536000) {
      return `${Math.floor(seconds / 2592000)}mo ago`;
    } else {
      return `${Math.floor(seconds / 31536000)}y ago`;
    }
  }