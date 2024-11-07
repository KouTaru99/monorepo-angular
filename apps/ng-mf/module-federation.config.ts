import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'ng-mf',
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@angular/core' ||
        libraryName === '@angular/common' ||
        libraryName === '@angular/router') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
      };
    }
    return defaultConfig;
  }
};

export default config;
