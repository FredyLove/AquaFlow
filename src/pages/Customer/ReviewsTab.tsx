/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Customer/ReviewsTab.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const ReviewsTab = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    const res = await fetch(`${baseURL}/products/${productId}/reviews`);
    const data = await res.json();
    setReviews(data.reviews);
  };

  const submitReview = async () => {
    if (!productId) {
      toast({ title: "Error", description: "Missing product ID" });
      return;
    }

    const res = await fetch(`${baseURL}/reviews/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: parseInt(productId),  // ensure integer
        rating: newReview.rating,
        comment: newReview.comment,
      }),
    });

    if (res.ok) {
      toast({ title: "Review submitted!" });
      setNewReview({ rating: 5, comment: "" });
      fetchReviews(); // refresh list
    } else {
      const data = await res.json();
      toast({ title: "Error", description: data.detail || "Could not submit review." });
    }
  };

  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-blue-800">Product Reviews</h3>

     {Array.isArray(reviews) && reviews.length > 0 ? (
      reviews.map((r, i) => (
        <Card key={i}>
          <CardContent className="p-4 space-y-1">
            <p className="font-semibold text-blue-700">Rating: {r.rating} ★</p>
            <p className="text-sm text-gray-700">{r.comment}</p>
            <p className="text-sm text-gray-500">By: {r.username}</p>
          </CardContent>
        </Card>
      ))
     ) : (
        <p className="text-gray-500">No reviews found.</p>
    )}

      <div className="pt-4 space-y-2">
        <h4 className="font-medium">Leave a Review</h4>
        <Input
          type="number"
          min={1}
          max={5}
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          placeholder="Rating (1–5)"
        />
        <Textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          placeholder="Write a comment..."
        />
        <Button onClick={submitReview}>Submit</Button>
      </div>
    </div>
  );
};

export default ReviewsTab;
