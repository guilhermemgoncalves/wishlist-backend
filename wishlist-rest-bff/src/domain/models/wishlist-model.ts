import { WishlistProductModel } from './wishlist-product.model';

export class WishlistModel {
  private userId: string;
  private products: WishlistProductModel[];
  private maximumProducts: number = 20;

  constructor(userId: string = '', products: WishlistProductModel[] = []) {
    this.userId = userId;
    this.products = products;
  }

  public validateProductExists(productId: string): boolean {
    return this.products.some((x) => x.id === productId);
  }

  public isFull() {
    return this.products.length >= this.maximumProducts;
  }

  public removeProduct(productId: string) {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  public addProduct(wishListProduct: WishlistProductModel) {
    this.products.push(wishListProduct);
  }

  getProducts(): WishlistProductModel[] {
    return this.products;
  }

  getUserId() {
    return this.userId;
  }
}
