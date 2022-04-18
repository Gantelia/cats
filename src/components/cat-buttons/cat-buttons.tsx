import { FormEvent, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { BACKEND_URL, REFRESH_FREQUENCY } from '../../const'

type CatButtonsProps = {
    onLoadedData: (data: string) => void
    onLoadingData: (isFetching: boolean) => void
    isLoading: boolean
    onError: (error: unknown) => void
}

function CatButtons({
    onLoadedData,
    onLoadingData,
    isLoading,
    onError,
}: CatButtonsProps): JSX.Element {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isAutoRefresh, setIsAutoRefresh] = useState(false)
    const [isGettingCat, setIsGettingCat] = useState(false)

    const fetchData = async () => {
        try {
            onLoadingData(true)
            const response = await fetch(BACKEND_URL)
            const data = await response.json()
            onLoadedData(data[0].url)
        } catch (error) {
            onError(error)
        } finally {
            onLoadingData(false)
        }
    }

    useEffect(() => {
        if (!isGettingCat) {
            return
        }

        if (isGettingCat) {
            fetchData()
            setIsGettingCat(false)
        }
    }, [isGettingCat, fetchData])

    useEffect(() => {
        if (!isAutoRefresh) {
            return
        }

        if (!isEnabled) {
            setIsAutoRefresh(false)
        }

        let fetchInterval: NodeJS.Timer | null = null

        if (isAutoRefresh) {
            fetchInterval = setInterval(fetchData, REFRESH_FREQUENCY)
        }

        if (isAutoRefresh && isGettingCat) {
            fetchInterval && clearInterval(fetchInterval)
        }

        return () => {
            fetchInterval && clearInterval(fetchInterval)
        }
    }, [isAutoRefresh, isEnabled, isGettingCat, fetchData])

    const handleButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
        evt.preventDefault()
        setIsGettingCat(true)
    }

    return (
        <form>
            <CheckboxList>
                <EnabledItem>
                    <Checkbox
                        type="checkbox"
                        onChange={() => setIsEnabled(!isEnabled)}
                        checked={isEnabled}
                    />
                    Enabled
                </EnabledItem>
                <AutoRefreshItem>
                    <Checkbox
                        type="checkbox"
                        disabled={!isEnabled || isLoading}
                        onChange={() => setIsAutoRefresh(!isAutoRefresh)}
                        checked={isEnabled && isAutoRefresh}
                    />
                    Auto-refresh every 5 seconds
                </AutoRefreshItem>
            </CheckboxList>
            <GetCatButton
                disabled={!isEnabled || isLoading}
                onClick={handleButtonClick}
            >
                Get cat
            </GetCatButton>
        </form>
    )
}

const CheckboxList = styled.ul`
    list-style-type: none;
    padding: 2px;
    margin: 0;
`
const checkboxStyles = css`
    font-size: 14px;
    accent-color: Gainsboro;
`
const EnabledItem = styled.li`
    margin-top: 5px;
    margin-bottom: 15px;
    ${checkboxStyles}
`
const AutoRefreshItem = styled.li`
    ${checkboxStyles}
`
const GetCatButton = styled.button`
    height: 36px;
    width: 270px;
    margin-top: 11px;
    margin-left: 2px;
`
const Checkbox = styled.input`
    width: 10px;
    height: 10px;
`


export default CatButtons
