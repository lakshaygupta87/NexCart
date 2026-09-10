import { ShoppingCart } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex items-center justify-center px-6 py-16"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="w-full max-w-md">

          {/* Common Brand */}
          <div className="text-center mb-12">

            <div className="flex items-center justify-center gap-2 mb-5">
              <ShoppingCart
                size={17}
                strokeWidth={1.5}
                style={{ color: "#C9A96E" }}
              />

              <span
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "#C9A96E" }}
              >
                Nexcart
              </span>
            </div>

            {/* Page-specific title */}
            <h1
              className="text-5xl md:text-6xl font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1b1c1a",
              }}
            >
              {title}
            </h1>

            {/* Page-specific subtitle */}
            {subtitle && (
              <p
                className="mt-5 text-sm"
                style={{ color: "#7A6E63" }}
              >
                {subtitle}
              </p>
            )}

          </div>


          {/* Page-specific form */}
          <div
            className="p-8 md:p-10"
            style={{
              backgroundColor: "#f5f3f0",
            }}
          >
            {children}
          </div>


          {/* Common Footer */}
          <div className="text-center mt-10">
            <span
              className="text-[9px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A96E",
              }}
            >
              Nexcart. © {new Date().getFullYear()}
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthLayout;

