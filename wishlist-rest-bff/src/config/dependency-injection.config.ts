import { ProductHttpClientImpl } from '../infrastructure/http/product-http-client.impl';
import { UserHttpClientImpl } from '../infrastructure/http/user-http-client-impl';
import { WishlistHttpClientImpl } from '../infrastructure/http/wishlist-http-client.impl';

export const DependencyInjectionConfig = [
  {
    provide: 'ProductHttpClient',
    useClass: ProductHttpClientImpl,
  },
  {
    provide: 'UserHttpClient',
    useClass: UserHttpClientImpl,
  },
  {
    provide: 'WishlistHttpClient',
    useClass: WishlistHttpClientImpl,
  },
];
