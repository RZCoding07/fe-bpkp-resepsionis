import { useLottie } from "lottie-react";
import LoadingAnimation from "@public/loading.json";

export const Loading = () => {
  const options = {
    animationData: LoadingAnimation,
    loop: true,
    autoplay: true,
    style: {
      width: '150px', // Adjust the width as needed
      height: '150px', // Optional: Adjust the height as needed
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};
