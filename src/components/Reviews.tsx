import ReviewStars from "./ReviewStars";

interface ReviewEntry {
  rating: number;
  title: string;
  description: string;
  reviewer: string;
}

interface ReviewData {
  entries: ReviewEntry[];
}

interface ReviewsProps {
  product: number;
  rData: ReviewData;
}

function Reviews(props: ReviewsProps) {
  // Initialize with numbers for position reference
  const r1 = 1,
    r2 = 2,
    r3 = 3,
    r4 = 4,
    r5 = 5;
  console.log("props.rData", props.rData.entries);
  const starArr: (number | string)[] = [r1, r2, r3, r4, r5];
  const ratingRounded = Math.round(props?.product);

  for (let i = 0; i < starArr.length; i++) {
    if (starArr[i] !== ratingRounded) {
      starArr[i] = "tw-text-yellow-400";
    } else if (ratingRounded === starArr[i]) {
      starArr[i] = "tw-text-yellow-400";
      starArr[i + 1] = "tw-text-yellow-400";
      break;
    }
  }
  return (
    <section>
      <div className="tw-mx-auto tw-max-w-screen-xl tw-px-4 tw-py-8 tw-sm:px-6 tw-lg:px-8">
        <h2 className="tw-text-xl tw-font-bold tw-sm:text-2xl">
          Customer Reviews
        </h2>

        <div className="tw-mt-4 tw-flex tw-items-center tw-gap-4">
          <p className="tw-text-3xl tw-font-medium">
            {props?.product}
            <span className="tw-sr-only"> Average review score </span>
          </p>

          <div>
            <div className="tw-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`tw-h-5 tw-w-5 tw-text-gray-200 ${starArr[r1]}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`tw-h-5 tw-w-5 tw-text-gray-200 ${starArr[r2]}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`tw-h-5 tw-w-5 tw-text-gray-200 ${starArr[r3]}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`tw-h-5 tw-w-5 tw-text-gray-200 ${starArr[r4]}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`tw-h-5 tw-w-5 tw-text-gray-200 ${starArr[r5]}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <p className="tw-mt-0.5 tw-text-xs tw-text-gray-500">
              Based on 48 reviews
            </p>
          </div>
        </div>

        {props?.rData?.entries.map((item) => (
          <div className="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-x-16 tw-gap-y-12 tw-lg:grid-cols-2">
            <blockquote>
              <header className="tw-sm:flex tw-sm:items-center tw-sm:gap-4">
                <ReviewStars rating={item?.rating} />
                <p className="tw-mt-2 tw-font-medium tw-sm:mt-0">
                  {item.title}
                </p>
              </header>

              <p className="tw-mt-2 tw-text-gray-700">{item.description}</p>

              <footer className="tw-mt-4">
                <p className="tw-text-xs tw-text-gray-500">{item.reviewer}</p>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
