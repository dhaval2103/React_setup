import { Spin } from "antd";
import React from "react";

const PageLoader = (props) => {
    return (
        <>
            {props.loading === false ?
                <></> : <div className='data_fetch_loader'>
                    <Spin size='large' />
                </div>}
        </>
    )
}

export default PageLoader