import styled from 'styled-components'

type ImageContainerProps = {
    image: string
}

type CatImageProps = {
    image: string
}

function CatImage({ image }: CatImageProps): JSX.Element {
    return <ImageContainer image={image} />
}

const ImageContainer = styled.div.attrs<ImageContainerProps>(({ image }) => ({
    style: {
        backgroundImage: `url(${image})`,
    },
}))<ImageContainerProps>`
    width: 270px;
    height: 235px;
    margin-top: 25px;
    margin-left: 2px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
`


export default CatImage
