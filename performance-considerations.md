# Angular Performance Considerations

## Table of Contents

- [1. Bundle Size Optimization](#1-bundle-size-optimization)
- [2. Change Detection Optimization](#2-change-detection-optimization)
- [3. Memory Management](#3-memory-management)
- [4. Data Caching Strategies](#4-data-caching-strategies)
- [5. Virtual Scrolling](#5-virtual-scrolling)
- [6. Web Workers](#6-web-workers)
- [7. Server-Side Rendering](#7-server-side-rendering)
- [8. Network Performance](#8-network-performance)
- [9. Performance Monitoring](#9-performance-monitoring)

## 1. Bundle Size Optimization

### Configuration

```typescript
// angular.json hoặc project.json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
    }
  ]
}
```

### Lazy Loading Implementation

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
];
```

📚 **Resources:**

- [Lazy Loading Documentation](https://angular.io/guide/lazy-loading-ngmodules)
- [Route-level code splitting guide](https://web.dev/route-level-code-splitting/)

## 2. Change Detection Optimization

### OnPush Strategy

```typescript
@Component({
  selector: 'app-heavy-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyComponent {
  @Input() data: any;
  constructor(private cd: ChangeDetectorRef) {}
  updateView() {
    this.cd.detectChanges();
  }
}
```

### Best Practices

- Use Immutable Objects
- Implement Pure Pipes
- Detach Change Detection when not needed

📚 **Resources:**

- [Change Detection Strategies](https://angular.io/guide/change-detection-strategy-examples)
- [Angular Change Detection Explained](https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/)

## 3. Memory Management

### RxJS Subscription Management

## 4. Data Caching Strategies

### Implementing Cache Service

```typescript
@Injectable()
export class CachingService {
  private cache = new Map<string, BehaviorSubject<any>>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  getData(key: string): Observable<any> {
    if (!this.cache.has(key)) {
      this.cache.set(key, new BehaviorSubject(null));

      this.http
        .get(`/api/${key}`)
        .pipe(
          tap((data) => {
            this.cache.get(key)?.next(data);
            setTimeout(() => this.invalidateCache(key), this.CACHE_DURATION);
          })
        )
        .subscribe();
    }

    return this.cache.get(key)!.asObservable();
  }

  invalidateCache(key: string) {
    this.cache.delete(key);
  }
}
```

📚 **Resources:**

- [HTTP Caching Best Practices](https://angular.io/guide/http#caching)
- [RxJS Caching Strategies](https://blog.angular-university.io/angular-caching/)

## 5. Virtual Scrolling

### Implementation

```typescript
@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="50">
      <div *cdkVirtualFor="let item of items">{{ item }}</div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class ListComponent {
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
}
```

### When to Use

- Large Lists
- Infinite Scrolling
- Dynamic Data Loading

📚 **Resources:**

- [Virtual Scrolling Guide](https://material.angular.io/cdk/scrolling/overview)
- [Scrolling Performance](https://developers.google.com/web/updates/2016/07/infinite-scroller)

## 6. Web Workers

### Implementation

```typescript
// heavy-computation.worker.ts
addEventListener('message', ({ data }) => {
  const result = performHeavyComputation(data);
  postMessage(result);
});

// component.ts
export class Component {
  constructor() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./heavy-computation.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log('Computation result:', data);
      };
    }
  }
}
```

📚 **Resources:**

- [Web Workers in Angular](https://angular.io/guide/web-worker)
- [Using Web Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## 7. Server-Side Rendering (SSR)

### Basic Setup

```typescript
// app.module.server.ts
@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

### Benefits

- Improved SEO
- Faster First Contentful Paint
- Better Performance on Mobile Devices

📚 **Resources:**

- [Angular Universal Guide](https://angular.io/guide/universal)
- [SSR Performance Benefits](https://web.dev/rendering-on-the-web/)

## 8. Network Performance

### Optimizing API Calls

```typescript
@Injectable()
export class NetworkOptimizedService {
  private searchSubject = new Subject<string>();

  search$ = this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.http.get(`/api/search?q=${term}`))
  );

  batchRequests(requests: Observable<any>[]) {
    return forkJoin(requests).pipe(retry(3), catchError(this.handleError));
  }
}
```

### Best Practices

- Implement Request Caching
- Use Debouncing/Throttling
- Batch API Requests
- Implement Retry Logic

📚 **Resources:**

- [Network Optimization Strategies](https://web.dev/optimizing-content-efficiency-loading-third-party-javascript/)
- [HTTP Best Practices](https://angular.io/guide/http#best-practices)

## 9. Performance Monitoring

### Implementation

```typescript
import { enableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
})
export class AppComponent {
  constructor(private componentRef: ComponentRef<AppComponent>) {
    if (environment.development) {
      enableDebugTools(componentRef);
    }
  }
}
```

### Key Metrics to Monitor

1. First Contentful Paint (FCP)
2. Time to Interactive (TTI)
3. Total Blocking Time (TBT)
4. Largest Contentful Paint (LCP)
5. Cumulative Layout Shift (CLS)

### Performance Service

```typescript
@Injectable()
export class PerformanceMonitoringService {
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.measurePerformance();
    });
  }

  private measurePerformance() {
    if ('performance' in window) {
      performance.mark('appStart');
      // Additional measurements
    }
  }
}
```

📚 **Resources:**

- [Angular DevTools](https://angular.io/guide/devtools)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Monitoring Guide](https://web.dev/measure-performance-with-the-RAIL-model/)

## Additional Resources

- [Angular Performance Checklist](https://angular.io/guide/performance-checklist)
- [RxJS Performance Tips](https://blog.angular-university.io/rxjs-higher-order-mapping/)
- [Angular Optimization Guide](https://web.dev/angular/)
- [Chrome DevTools Performance Monitoring](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)
