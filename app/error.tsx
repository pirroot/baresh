'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="p-50 text-center flex-col space-y-7 justify-center text-white/90">
      <h1 className="">خطا!</h1>
      <p className="">
        متاسفانه یک مشکلی پیش آمده است:
        <br />
        <strong>{error.message || 'خطای ناشناخته'}</strong>
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 rounded-xl p-3 "
      >
        تلاش مجدد
      </button>
    </section>
  );
}
