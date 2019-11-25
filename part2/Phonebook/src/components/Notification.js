import React from 'react'

const Notification = ({message}) => {
    const className = message.success ? 'success' : message.error ? 'error' : '',
        hasMessage = message.success || message.error
    return (
        hasMessage ? <div className={className}>
            <span>{hasMessage}</span>
        </div> : null
    )
}

export default Notification