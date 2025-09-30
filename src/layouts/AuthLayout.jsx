import { DollarSign, PieChart, TrendingUp } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="mb-8 flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <DollarSign className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">ExpenseTracker</h1>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Manage Your Finances</h2>
            <p className="text-xl opacity-90 max-w-md">
              Take control of your spending with our intuitive expense tracking platform
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-sm opacity-80">Track Spending</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <PieChart className="w-8 h-8" />
              </div>
              <p className="text-sm opacity-80">Analytics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <DollarSign className="w-8 h-8" />
              </div>
              <p className="text-sm opacity-80">Save Money</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="lg:hidden mb-6 flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">ExpenseTracker</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  export default AuthLayout;