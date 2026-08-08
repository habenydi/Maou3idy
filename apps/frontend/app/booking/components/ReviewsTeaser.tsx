'use client';

import Img from 'next/image';
import { Review } from '@/types';

export default function ReviewsTeaser(reviews: Review[]) {
    const reviewsNumber = reviews.length;

    console.log('reviews:', reviews); // Debugging line to check the structure of reviews

    if (reviewsNumber === 0) {
        return (
            <div className="bg-surface-container-low p-6 rounded-3xl flex items-center justify-between">
                <div className="text-sm font-bold">No reviews yet</div>
            </div>
        );
    }
    return (
        <div className="bg-surface-container-low p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Img
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        src={reviews[0].image}
                        alt={`${reviews[0].name}`}
                    />
                </div>
                <div>
                    <div className="text-sm font-bold">{reviews[0].name}</div>
                    <div className="text-xs text-on-surface-variant">{reviews[0].comment}</div>
                </div>
            </div>
            <div className="text-sm font-bold">{reviewsNumber} review{reviewsNumber > 1 ? 's' : ''}</div>
        </div>
    );
}