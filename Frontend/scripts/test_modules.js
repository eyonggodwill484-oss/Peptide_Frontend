try {
  require('./src/lib/data/tablet-products');
  console.log('tablet-products loaded OK');
  require('./src/lib/data/products');
  console.log('products loaded OK');
} catch (e) {
  console.error('Error loading modules:', e);
}
