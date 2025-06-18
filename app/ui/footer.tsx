// @ts-nocheck
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0 font-semibold flex flex-col items-start gap-1">
          <span>Contact us:</span>
          <span>(02) 83742271</span>
          <span>(02) 83742271</span>
        </div>
        <div className="text-xs text-gray-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} IntraAsia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
