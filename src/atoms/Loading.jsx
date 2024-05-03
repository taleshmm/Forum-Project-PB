/* eslint-disable react/prop-types */
export default function Loading({ colorLoad }) {
  return (
    <div className="flex items-center justify-center h-[600px]">
      <div
        className={`animate-spin rounded-full h-10 w-10 border-b-2 ${
          colorLoad ? colorLoad : 'border-gray-200'
        }`}
      ></div>
    </div>
  );
}
