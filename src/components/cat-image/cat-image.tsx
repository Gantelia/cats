import styled from 'styled-components'

type CatImageProps = {
    image: string
}

function CatImage({ image }: CatImageProps): JSX.Element {
    return <Image src={image} alt="A cat." />
}

const Image = styled.img`
    width: 270px;
    height: 235px;
    margin-top: 25px;
    margin-left: 2px;
    object-fit: contain;
`

export default CatImage
