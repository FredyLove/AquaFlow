import { useParams } from 'react-router-dom';
import ReviewsTab from './ReviewsTab';

const ProductReviewsPage = () => {
  const { productId } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ReviewsTab productId={productId} />
    </div>
  );
};

export default ProductReviewsPage;
