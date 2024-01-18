import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ResultCardSkeleton = () => {
    return (
        <>
            {/* <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme> */}
            <div className="text-center py-5">
                <div className='py-5'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultCardSkeleton;
