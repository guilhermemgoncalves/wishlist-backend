import { ProductHttpClientImpl } from '../infrastructure/http/product-http-client.impl';
import { UserHttpClientImpl } from '../infrastructure/http/user-http-client-impl';
import { WishlistHttpClientImpl } from '../infrastructure/http/wishlist-http-client.impl';
import { AddProductUseCase } from '../application/use-case/add-product-use-case';
import { CheckIfProductExistsUseCase } from '../application/use-case/check-if-product-exists-use-case';
import { RemoveProductUseCase } from '../application/use-case/remove-product-use-case';
import { ProductService } from '../domain/services/product/product.service';
import { UserService } from '../domain/services/user/user.service';
import { WishlistService } from '../domain/services/wishlist/wishlist.service';
import { ListProductsUseCase } from '../application/use-case/list-products-use-case';

const HttpClientProviders = [
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

const ServiceProviders = [ProductService, UserService, WishlistService];

const UseCaseProviders = [
  AddProductUseCase,
  CheckIfProductExistsUseCase,
  ListProductsUseCase,
  RemoveProductUseCase,
];

export const DependencyInjectionConfig = [
  ...HttpClientProviders,
  ...ServiceProviders,
  ...UseCaseProviders,
];
