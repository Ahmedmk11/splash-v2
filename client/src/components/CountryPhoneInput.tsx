import React, { useEffect, useState, useContext } from 'react'
import { Input, Select } from 'antd'
import { getCountryDataList, getEmojiFlag } from 'countries-list'
const { Option } = Select
import countries from 'country-data'

interface CountryPhoneInputProps {
    onChange: (value: any) => void
}

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({ onChange }) => {
    const [country, setCountry] = useState<any>('EGY')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryDataList, setCountryDataList] = useState<any[]>([])

    useEffect(() => {
        setCountryDataList(getCountryDataList())
    }, [])

    function getPhoneCode(iso: any) {
        let curr = countries.countries.all.find((c: any) => c.alpha3 === iso)
        console.log('curr:', curr)
        return curr?.countryCallingCodes[0]
    }

    const handleCountryChange = (value: any) => {
        setCountry(value)
    }

    const handleInputChange = (value: string) => {
        const formattedValue = value.replace(/\D/g, '')
        setPhoneNumber(formattedValue)
        let ac = getPhoneCode(country)
        onChange(`${ac} ${formattedValue}`)
    }

    return (
        <Input
            style={{ width: '100%' }}
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            addonBefore={
                <Select
                    style={{ minWidth: 75 }}
                    dropdownStyle={{ width: 200 }}
                    onChange={handleCountryChange}
                    value={country}
                >
                    {countryDataList.map((country: any) => (
                        <Option key={country.iso3} value={country.iso3}>
                            {getEmojiFlag(country.iso2)} +{country.phone[0]}
                        </Option>
                    ))}
                </Select>
            }
        />
    )
}

export default CountryPhoneInput
