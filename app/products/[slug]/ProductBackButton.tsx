import { useRouter } from 'next/navigation';

interface ProductBackButtonProps {
  product: {
    category: string;
    subcategory: string;
  };
}

export default function ProductBackButton({ product }: ProductBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/categories/${product.category}/${product.subcategory}`);
  };

  return (
    <button
      onClick={handleBack}
      className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium transition-colors"
      aria-label="Back to product list"
    >
      ← Back to Products
    </button>
  );
}

