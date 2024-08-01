const displayTime = (timestamp: number) => {
    const date = new Date(timestamp)

    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('en-GB', { month: 'long' })
    const year = date.getFullYear()
    const hour = date.getHours() % 12 || 12
    const minute = date.getMinutes().toString().padStart(2, '0')
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM'

    return `${day} ${month} ${year}, ${hour}:${minute} ${amPm}`
}

export default displayTime
