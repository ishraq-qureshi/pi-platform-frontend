import { FC, useEffect, useState } from "react";
import LoadingCircle from "@/assets/loaders/loading-circle.svg";


interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: FC<PageLoaderProps> = ({
  isLoading
}) => {
  const [pageLoading, setPageLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    setPageLoading(isLoading);
  }, [isLoading])

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white flex justify-center items-center">
      <LoadingCircle className="w-10 h-10"/>
    </div>
  );
}

export default PageLoader;