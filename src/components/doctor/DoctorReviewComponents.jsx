import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, UserCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600 hover:text-yellow-300'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => {}} 
          onMouseLeave={() => {}}
        />
      ))}
    </div>
  );
};

export const ReviewForm = ({ doctorId, onReviewSubmit }) => {
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || rating === 0 || !comment.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please provide your name, a rating, and a comment.",
        variant: "destructive",
      });
      return;
    }
    const newReview = {
      id: uuidv4(),
      doctorId,
      reviewerName,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    onReviewSubmit(newReview);
    setReviewerName('');
    setRating(0);
    setComment('');
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50 glassmorphism">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Leave a Review</h3>
      <div>
        <Label htmlFor="reviewerName" className="text-slate-700 dark:text-slate-200">Your Name</Label>
        <Input id="reviewerName" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} placeholder="e.g., Jane Doe" className="mt-1" />
      </div>
      <div>
        <Label className="text-slate-700 dark:text-slate-200">Your Rating</Label>
        <StarRatingInput rating={rating} setRating={setRating} />
      </div>
      <div>
        <Label htmlFor="comment" className="text-slate-700 dark:text-slate-200">Your Comment</Label>
        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." className="mt-1 min-h-[100px]" />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Send className="h-4 w-4 mr-2" /> Submit Review
      </Button>
    </form>
  );
};

export const DoctorReviews = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${doctorId}`)) || [];
    setReviews(storedReviews.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [doctorId]);

  const handleReviewSubmit = (newReview) => {
    const updatedReviews = [newReview, ...reviews].sort((a,b) => new Date(b.date) - new Date(a.date));
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${doctorId}`, JSON.stringify(updatedReviews));
  };
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <ReviewForm doctorId={doctorId} onReviewSubmit={handleReviewSubmit} />
      
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-8">
        Patient Reviews ({reviews.length}) - Average Rating: {calculateAverageRating()} <Star className="inline-block h-5 w-5 text-yellow-400 fill-yellow-400 ml-1" />
      </h3>
      {reviews.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">Be the first to review this doctor!</p>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white dark:bg-slate-800/70 glassmorphism">
              <CardContent className="p-4">
                <div className="flex items-start mb-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback><UserCircle className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{review.reviewerName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-auto flex flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};