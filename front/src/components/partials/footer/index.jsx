const Footer = ({ className = "custom-class" }) => {
  const link = (
    <a
      href="https://hamzehazizzadeh.ir"
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-700 font-semibold"
    >
      حمزه عزیززاده
    </a>
  );

  return (
    <footer className={className}>
      <div className="site-footer px-6 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 py-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
          <div className="text-center rtl:md:text-right text-sm">
            کلیه حقوق برای {link} محفوظ است.
          </div>
          <div className="rtl:md:text-end text-center text-sm">
            طراحی و توسعه توسط {link}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
