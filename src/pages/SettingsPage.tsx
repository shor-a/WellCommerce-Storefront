import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import NavigationText from "@/components/section/NavigationText"
import { SettingsSection } from "@/components/section/SettingsSection"
import { PageRoutes } from "@/config/routes"

const settingsCrumbs = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "Settings", href: null },
]

const SettingsPage = () => (
  <>
    <Navbar />
    <NavigationText crumbs={settingsCrumbs} />
    <SettingsSection className="py-6 lg:py-10" />
    <Footer />
  </>
)

export default SettingsPage
