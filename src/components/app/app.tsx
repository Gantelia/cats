import { useState } from 'react'
import styled from 'styled-components'

import { DEFAULT_IMAGE } from '../../const'

import CatButtons from '../cat-buttons/cat-buttons'
import CatImage from '../cat-image/cat-image'
import ErrorMessage from '../error-message/error-message'

function App() {
    const [image, setImage] = useState(DEFAULT_IMAGE)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const onLoadingData = (isFetching: boolean) => {
        setIsLoading(isFetching)
    }

    const onLoadedData = (data: string) => {
        setImage(data)
    }

    const onError = (error: unknown) => {
        setIsError(true)
        throw new Error(`${error}`)
    }

    return (
        <CatWrapper>
            <CatButtons
                onLoadedData={onLoadedData}
                onLoadingData={onLoadingData}
                isLoading={isLoading}
                onError={onError}
            />
            {isError && <ErrorMessage />}
            {isLoading && !isError && <p>Loading...</p>}
            {!isLoading && !isError && <CatImage image={image} />}
        </CatWrapper>
    )
}

const CatWrapper = styled.div`
    border: solid 1px;
    border-radius: 4px;
    width: 315px;
    height: 371px;
    padding: 11px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`


export default App
