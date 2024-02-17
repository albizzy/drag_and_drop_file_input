const Layout = ({ children }) => {
    return (
        <>
            <div className="w-full h-screen relative">
                <main className="w-full h-full grow">
                    <div className="w-full h-full py-20 px-4 md:px-10 lg:px-32">
                        { children }
                    </div>
                </main>
            </div>
        </>
    )
}

export default Layout;