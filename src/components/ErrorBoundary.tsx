import { Component, ErrorInfo, ReactNode } from "react";
import EcoCard from "./EcoCard";
import EcoButton from "./EcoButton";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the component tree
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
          <EcoCard className="max-w-md w-full text-center">
            <div className="space-y-6">
              <AlertCircle className="h-16 w-16 mx-auto text-destructive" />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Oops! Something went wrong
                </h1>
                <p className="text-muted-foreground">
                  We encountered an unexpected error. Don't worry, your eco data is safe!
                </p>
              </div>
              
              <EcoButton 
                onClick={this.handleReset}
                variant="primary"
                className="w-full"
              >
                <RefreshCw className="h-4 w-4" />
                Return to Dashboard
              </EcoButton>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left text-xs text-muted-foreground bg-muted p-4 rounded-lg">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </EcoCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
