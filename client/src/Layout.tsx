import Header from './components/Header'
import FooterComponent from './components/FooterComponent.tsx'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div id="layout">
            <Header />

            {children}

            <FooterComponent />
        </div>
    )
}

export default Layout
