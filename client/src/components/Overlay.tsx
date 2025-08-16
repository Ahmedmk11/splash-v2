import { useState } from 'react'

const Overlay = () => {
    const [visible, setVisible] = useState<boolean>(true)

    const handleContinue = (): void => setVisible(false)

    if (!visible) return null

    return (
        <div className="overlay">
            <img src="/text.png" alt="Promo Text" className="overlay-text" />
            <button className="continue-btn" onClick={handleContinue}>
                Continue to Shop
            </button>
        </div>
    )
}

export default Overlay
