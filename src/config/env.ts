const requiredEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  cybersoftToken: import.meta.env.VITE_CYBERSOFT_TOKEN,
};

function getEnvValue(value: string | undefined, name: string): string {
  if (!value || !value.trim()) {
    throw new Error(`Thiếu biến môi trường: ${name}`);
  }
  return value;
}

export const env = {
  apiBaseUrl: getEnvValue(requiredEnv.apiBaseUrl, 'VITE_API_BASE_URL'),
  cybersoftToken: getEnvValue(requiredEnv.cybersoftToken, 'VITE_CYBERSOFT_TOKEN'),
};