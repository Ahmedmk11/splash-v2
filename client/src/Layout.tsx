import Header from './components/Header'
import FooterComponent from './components/FooterComponent.tsx'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const clonedChildren = React.Children.map(children, (child) =>
        React.isValidElement<{ className?: string }>(child)
            ? React.cloneElement(child, { className: 'layout-child' })
            : child
    )

    return (
        <div id="layout">
            <Header />

            {clonedChildren}

            <FooterComponent />
        </div>
    )
}

export default Layout
