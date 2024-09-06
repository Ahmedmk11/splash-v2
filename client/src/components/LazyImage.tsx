import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import { baseURL } from '../utils/axiosApi'

const LazyImage = ({
    imageUrl,
    alt,
    width,
    height,
}: {
    imageUrl: string
    alt: string
    width: string | number | 'none'
    height: string | number | 'none'
}) => {
    return (
        <LazyLoad
            style={
                width === 'none' || height === 'none'
                    ? {}
                    : { height: height, width: width }
            }
            offset={100}
        >
            <img
                src={baseURL.slice(0, -1) + imageUrl}
                alt={alt}
                style={{
                    objectFit: 'cover',
                    width: width,
                    height: height,
                }}
            />
        </LazyLoad>
    )
}

export default LazyImage
