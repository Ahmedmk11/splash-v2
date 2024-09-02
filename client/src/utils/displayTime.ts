// Function to convert Western Arabic numerals to Eastern Arabic numerals
const toEasternArabicNumerals = (number: string | number) => {
    const arabicNumerals = '٠١٢٣٤٥٦٧٨٩'
    return String(number).replace(/\d/g, (digit) => arabicNumerals[+digit])
}

const displayTime = (timestamp: number, language: string) => {
    const date = new Date(timestamp)

    // Convert day, year, hour, and minute to Eastern Arabic numerals if language is 'ar'
    const day =
        language === 'ar'
            ? toEasternArabicNumerals(
                  date.getDate().toString().padStart(2, '0')
              )
            : date.getDate().toString().padStart(2, '0')
    const month =
        language === 'ar'
            ? [
                  'يناير',
                  'فبراير',
                  'مارس',
                  'أبريل',
                  'مايو',
                  'يونيو',
                  'يوليو',
                  'أغسطس',
                  'سبتمبر',
                  'أكتوبر',
                  'نوفمبر',
                  'ديسمبر',
              ][date.getMonth()]
            : date.toLocaleString('en-GB', { month: 'long' })
    const year =
        language === 'ar'
            ? toEasternArabicNumerals(date.getFullYear())
            : date.getFullYear().toString()
    const hour =
        language === 'ar'
            ? toEasternArabicNumerals(date.getHours() % 12 || 12)
            : (date.getHours() % 12 || 12).toString()
    const minute =
        language === 'ar'
            ? toEasternArabicNumerals(
                  date.getMinutes().toString().padStart(2, '0')
              )
            : date.getMinutes().toString().padStart(2, '0')
    const amPm =
        language === 'ar'
            ? date.getHours() >= 12
                ? 'م'
                : 'ص'
            : date.getHours() >= 12
            ? 'PM'
            : 'AM'

    return language === 'ar'
        ? `${day} ${month} ${year}، ${hour}:${minute} ${amPm}`
        : `${day} ${month} ${year}, ${hour}:${minute} ${amPm}`
}

export default displayTime
