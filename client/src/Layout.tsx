import Header from './components/Header'
import FooterComponent from './components/FooterComponent'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <FooterComponent />
        </>
    )
}

export default Layout
