import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

const baseConfig = {
  ...config,
  remotes: [
    ['app-remote', process.env.REMOTE_URL || 'http://localhost:4201'] as [string, string]
  ],
  shared: (libraryName: string, defaultConfig: any) => {
    if (libraryName === '@angular/core' ||
        libraryName === '@angular/common' ||
        libraryName === '@angular/router') {
      return {
        singleton: true,
        strictVersion: true,
        requiredVersion: '^18.0.0'
      };
    }
    return defaultConfig;
  }
};

export default withModuleFederation(baseConfig);
