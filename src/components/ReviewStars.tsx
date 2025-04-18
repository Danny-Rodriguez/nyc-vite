interface ReviewStarsProps {
  rating: number;
}

function ReviewStars(props: ReviewStarsProps) {
  let star1 = "";
  let star2 = "";
  let star3 = "";
  let star4 = "";
  let star5 = "";
  const ratingRounded = Math.round(props.rating);
  if (ratingRounded === 1) {
    star1 = "tw-text-yellow-400";
    star2 = "tw-text-gray-200";
    star3 = "tw-text-gray-200";
    star4 = "tw-text-gray-200";
    star5 = "tw-text-gray-200";
  }
  if (ratingRounded === 2) {
    star1 = "tw-text-yellow-400";
    star2 = "tw-text-yellow-400";
    star3 = "tw-text-gray-200";
    star4 = "tw-text-gray-200";
    star5 = "tw-text-gray-200";
  }
  if (ratingRounded === 3) {
    star1 = "tw-text-yellow-400";
    star2 = "tw-text-yellow-400";
    star3 = "tw-text-yellow-400";
    star4 = "tw-text-gray-200";
    star5 = "tw-text-gray-200";
  }
  if (ratingRounded === 4) {
    star1 = "tw-text-yellow-400";
    star2 = "tw-text-yellow-400";
    star3 = "tw-text-yellow-400";
    star4 = "tw-text-yellow-400";
    star5 = "tw-text-gray-200";
  }
  if (ratingRounded === 5) {
    star1 = "tw-text-yellow-400";
    star2 = "tw-text-yellow-400";
    star3 = "tw-text-yellow-400";
    star4 = "tw-text-yellow-400";
    star5 = "tw-text-yellow-400";
  }
  return (
    <div className="tw-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`tw-h-5 tw-w-5 ${star1}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`tw-h-5 tw-w-5 ${star2}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`tw-h-5 tw-w-5 ${star3}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`tw-h-5 tw-w-5 ${star4}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`tw-h-5 tw-w-5 ${star5}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
}

export default ReviewStars;
