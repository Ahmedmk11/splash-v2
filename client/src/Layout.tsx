import Header from './components/Header'
import FooterComponent from './components/FooterComponent.tsx'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
            }}
        >
            <Header />

            {children}

            <FooterComponent />
        </div>
    )
}

export default Layout
