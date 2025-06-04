import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { X, Upload, Link } from 'lucide-react';
import { createProduct, updateProduct } from '../../lib/admin';

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url || null);
  const [imageMethod, setImageMethod] = useState<'upload' | 'url'>(product?.image_url?.startsWith('http') ? 'url' : 'upload');
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      is_available: product.is_available,
      dietary_info: product.dietary_info?.join(', ') || '',
      featured: product.featured,
      image_url: product.image_url || ''
    } : {
      is_available: true,
      featured: false,
      image_url: ''
    }
  });

  const imageUrl = watch('image_url');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      // Process dietary info from comma-separated string to array
      const dietaryInfo = data.dietary_info
        ? data.dietary_info.split(',').map((item: string) => item.trim())
        : [];
      
      // Get image URL based on selected method
      let imageUrl;
      if (imageMethod === 'url') {
        imageUrl = data.image_url || 'https://placehold.co/300x200';
      } else {
        // For file upload, we'll use a placeholder since we don't have storage permissions
        imageUrl = imagePreview || 'https://placehold.co/300x200';
      }
      
      const productData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        is_available: data.is_available !== undefined ? data.is_available : true,
        dietary_info: dietaryInfo,
        featured: data.featured !== undefined ? data.featured : false,
        image_url: imageUrl
      };
      
      if (product) {
        // Update existing product
        await updateProduct(product.id, productData);
      } else {
        // Create new product
        await createProduct(productData);
      }
      
      toast.success(`Product ${product ? 'updated' : 'created'} successfully`);
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Failed to ${product ? 'update' : 'create'} product`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Product name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description', { required: 'Description is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price ($) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message as string}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select a category</option>
                <option value="appetizers">Appetizers</option>
                <option value="mains">Main Courses</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message as string}</p>
              )}
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              
              {/* Image method selection */}
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMethod('upload')}
                  className={`px-3 py-2 text-sm flex items-center ${
                    imageMethod === 'upload' 
                      ? 'bg-primary-100 text-primary-700 border-primary-300' 
                      : 'bg-white text-gray-700 border-gray-300'
                  } border rounded-md`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageMethod('url')}
                  className={`px-3 py-2 text-sm flex items-center ${
                    imageMethod === 'url' 
                      ? 'bg-primary-100 text-primary-700 border-primary-300' 
                      : 'bg-white text-gray-700 border-gray-300'
                  } border rounded-md`}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Image URL
                </button>
              </div>
              
              {imageMethod === 'upload' ? (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imagePreview ? (
                    <div className="space-y-2 text-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto h-32 w-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    {...register('image_url')}
                    onChange={handleImageUrlChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {imagePreview && (
                    <div className="mt-3 flex justify-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="dietary_info" className="block text-sm font-medium text-gray-700">
                Dietary Information (comma separated)
              </label>
              <input
                id="dietary_info"
                type="text"
                placeholder="e.g. Vegetarian, Gluten-Free, Spicy"
                {...register('dietary_info')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  id="is_available"
                  type="checkbox"
                  {...register('is_available')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="is_available" className="ml-2 block text-sm text-gray-700">
                  Available for ordering
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  {...register('featured')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured product
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}