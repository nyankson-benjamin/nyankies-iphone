import { Button } from '../ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'

interface ErrorPageProps {
  title?: string
  message?: string
  showRetry?: boolean
  onRetry?: () => void
}

export default function ErrorPage({
  title = "Something went wrong",
  message = "An error occurred while loading the data. Please try again later.",
  showRetry = true,
  onRetry= ()=>window.location.reload()
}: Readonly<ErrorPageProps>) {
  const navigate = useNavigate()
const location = useLocation()
  return (
    <div className='flex items-center justify-center my-10'>
      <div className="min-h-[400px] m-10 flex flex-col items-center justify-center p-4 bg-white rounded-lg w-full md:w-1/2 lg:w-1/3">
      {/* Error Icon */}
      <div className="text-red-500 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      {/* Error Content */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 text-center mb-6">{message}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
       {location.pathname !== "/" && <Button 
          onClick={() => navigate(-1)}
          variant="outline"
        >
          Go Back
        </Button>}
        {showRetry && (
          <Button 
            onClick={onRetry}
           
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
    </div>
  )
} 