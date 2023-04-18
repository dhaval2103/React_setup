import React from 'react'
import Lottie from 'react-lottie';
import * as smartHomeImageData from '../../../images/smart_home_image.json'
function SubscribeUser() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: smartHomeImageData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={defaultOptions} width={800} />
    )
}
export default SubscribeUser