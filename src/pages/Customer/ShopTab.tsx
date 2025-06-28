/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const ShopTab = ({ handleAddToCart, handleBookmark }) => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseURL}/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast({ title: "Error", description: "Could not load products" });
      }
    };

    fetchProducts();
  }, []);

  return (
    <TabsContent value="shop" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Available Products</h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {products.length} items
        </Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-blue-900">{product.name}</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  In Stock
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold mt-3 text-blue-700">XAF {product.price}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleBookmark(product.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Link to={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View Reviews</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
};

export default ShopTab;
