import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app-remote',
  exposes: {
    './Routes': 'apps/app-remote/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
