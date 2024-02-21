
export interface LoadingProps {
}

export const Loading: React.FC<LoadingProps> = () => {
    // this react component is a simple loading spinner that is used to indicate that the app is loading data
    // the whole screen is disabled when the spinner is active
    return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    )
};