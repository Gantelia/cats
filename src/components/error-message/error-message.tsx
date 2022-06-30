import styled from 'styled-components'

const ErrorText = styled.p`
    font-size: 16px;
    color: red;
    text-align: center;
    width: 270px;
    height: 235px;
    margin-left: 2px;
`

function ErrorMessage() {
    return (
        <ErrorText>
            Unfortunately, all cats ran away!
            <br />
            Please, reload the page and try to get another cat.
        </ErrorText>
    )
}

export default ErrorMessage
