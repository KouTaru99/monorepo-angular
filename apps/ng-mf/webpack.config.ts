import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

export default withModuleFederation({
  ...config,
  remotes: [
    ['app-remote', 'http://localhost:4201/remoteEntry.js']
  ]
});
