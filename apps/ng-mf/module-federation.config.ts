import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'ng-mf',
  remotes: [],
  shared: (libraryName: string) => {
    if (libraryName === '@angular/core' || libraryName === '@angular/common') {
      return {
        singleton: true,
        strictVersion: true,
      };
    }
    // Trả về undefined cho các thư viện khác
    return undefined;
  },
};

export default config;
